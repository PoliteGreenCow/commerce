import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import expressAsyncHandler from 'express-async-handler'
import { isAuth, isAdmin } from '../utils'

export const productRouter = express.Router()
// /api/prodcuts
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)
productRouter.get(
  '/categories',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct('category')
    res.json(categories)
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
productRouter.post(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const newProduct = new ProductModel({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    })
    const product = await newProduct.save()
    res.json({ message: 'Product Created', product })
  })
)

// Update a product (admin only)
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id
    const product = await ProductModel.findById(productId)
    if (product) {
      product.name = req.body.name || product.name
      product.slug = req.body.slug || product.slug
      product.price = req.body.price || product.price
      product.image = req.body.image || product.image
      product.category = req.body.category || product.category
      product.brand = req.body.brand || product.brand
      product.countInStock = req.body.countInStock || product.countInStock
      product.description = req.body.description || product.description
      await product.save()
      res.json({ message: 'Product Updated' })
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
)

// Delete a product (admin only)
productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id)
    if (product) {
      await ProductModel.deleteOne({ _id: product._id })
      res.json({ message: 'Product Deleted' })
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
)