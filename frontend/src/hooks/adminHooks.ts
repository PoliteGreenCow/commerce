import { useQuery, useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Product } from '../types/Product'

export const useGetSummaryQuery = () =>
  useQuery({
    queryKey: ['summary'],
    queryFn: async () =>
      (await apiClient.get<{
        users: [{ numUsers: number }]
        orders: [{ numOrders: number; totalSales: number }]
        dailyOrders: []
        productCategories: []
      }>(`/api/orders/summary`)).data,
  })

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<[Product]>(`/api/products`)).data,
  })

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async (product: {
      name: string
      price: number
      image: string
      category: string
      brand: string
      countInStock: number
      description: string
    }) =>
      (
        await apiClient.post<{ product: Product; message: string }>(
          `/api/products`,
          product
        )
      ).data,
  })

// Add more admin-related hooks as needed