import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { CartItem, ShippingAddress } from '../types/Cart'
import { Order } from '../types/Order'

// Existing hooks...

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () =>
      (await apiClient.get<Order>(`api/orders/${id}`)).data,
  })

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  })

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  })

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ['order-history'],
    queryFn: async () =>
      (await apiClient.get<Order[]>(`/api/orders/mine`)).data,
  })

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[]
      shippingAddress: ShippingAddress
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  })

// New feature: Order Summary Query
type OrderSummary = {
  users: { numUsers: number }[]
  orders: { numOrders: number; totalSales: number }[]
  dailyOrders: { _id: string; sales: number }[]
  productCategories: { _id: string; count: number }[]
}

export const useGetOrderSummaryQuery = () =>
  useQuery({
    queryKey: ['order-summary'],
    queryFn: async () =>
      (await apiClient.get<OrderSummary>(`/api/orders/summary`)).data,
  })
  export const useGetOrdersQuery = () =>
    useQuery({
      queryKey: ['orders'],
      queryFn: async () => (await apiClient.get<Order[]>('/api/orders')).data,
    });