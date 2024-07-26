import express from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import expressAsyncHandler from 'express-async-handler'

export const productRouter = express.Router()
// /api/prodcuts
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)
// /api/slug/tshirt
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
)

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await ProductModel.distinct('category')
    res.json(categories)
  })
)

// New route for search
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req.query
    const products = await ProductModel.find(
      {
        $or: [
          { name: { $regex: query as string, $options: 'i' } },
          { category: { $regex: query as string, $options: 'i' } },
          { brand: { $regex: query as string, $options: 'i' } },
        ],
      }
    ).lean()
    res.json(products)
  })
)
