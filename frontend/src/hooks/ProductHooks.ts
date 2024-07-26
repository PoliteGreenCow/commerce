import { useMutation, useQuery } from "@tanstack/react-query"
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
      export const useGetCategoriesQuery = () =>
        useQuery({
          queryKey: ['categories'],
          queryFn: async () =>
            (await apiClient.get<[]>(`/api/products/categories`)).data,
        })
      
      export const useSearchProductsQuery = (query: string) =>
        useQuery({
          queryKey: ['search', query],
          queryFn: async () =>
            (await apiClient.get<Product[]>(`/api/products/search?query=${query}`))
              .data,
        })
        
        export const useDeleteProductMutation = () =>
          useMutation({
            mutationFn: async (productId: string) =>
              (await apiClient.delete(`/api/products/${productId}`)).data,
          });
        
        export const useCreateProductMutation = () =>
          useMutation({
            mutationFn: async (product: Partial<Product>) =>
              (await apiClient.post<Product>('/api/products', product)).data,
          });
        
        export const useUpdateProductMutation = () =>
          useMutation({
            mutationFn: async (product: Product) =>
              (await apiClient.put<Product>(`/api/products/${product._id}`, product)).data,
          });