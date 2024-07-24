import { useQuery } from "@tanstack/react-query"
import { Product } from '../types/Product'
import apiClient from '../apiClient'

export const useGetProductsQuery = () =>
    useQuery({     
     queryKey: ['products'],
     queryFn: async () =>
       (
         await apiClient.get<Product[]>(`api/products`)
       ).data,
    })

    export const useGetProductDetailsBySlugQuery = (slug: string) =>
      useQuery({
        queryKey: ['products', slug],
        queryFn: async () =>
          (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
      })