import bcrypt from 'bcryptjs'
import { User } from './src/models/userModel'
import { Product } from './src/models/productModel'

export const sampleProducts: Product[] = [
  {
    name: 'Nike leather jacket',
    slug: 'nike-leather-jacket',
    category: 'Jacket',
    image: '../images/product_24.png',
    price: 120,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'high quality shirt',
  },
  {
    name: 'Adidas Fit fleece',
    slug: 'adidas-fit-fleece',
    category: 'Jacket',
    image: '../images/product_20.png',
    price: 100,
    countInStock: 20,
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description: 'high quality product',
  },
  {
    name: 'Lacoste tops',
    slug: 'lacoste-tops',
    category: 'Tops',
    image: '../images/product_11.png',
    price: 220,
    countInStock: 0,
    brand: 'Lacoste',
    rating: 4.8,
    numReviews: 17,
    description: 'high quality product',
  },
  {
    name: 'Nike tops',
    slug: 'nike-tops',
    category: 'Tops',
    image: '../images/product_3.png',
    price: 78,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description: 'high quality product',
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]