import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo } from '../types/UserInfo'
import { User } from '../types/User';

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  })
  export const useSignupMutation = () =>
    useMutation({
      mutationFn: async ({
        name,
        email,
        password,
      }: {
        name: string
        email: string
        password: string
      }) =>
        (
          await apiClient.post<UserInfo>(`api/users/signup`, {
            name,
            email,
            password,
          })
        ).data,
    })

    export const useUpdateProfileMutation = () =>
      useMutation({
        mutationFn: async ({
          name,
          email,
          password,
        }: {
          name: string
          email: string
          password: string
        }) =>
          (
            await apiClient.put<UserInfo>(`api/users/profile`, {
              name,
              email,
              password,
            })
          ).data,
      })

        export const useGetUsersQuery = () =>
          useQuery({
            queryKey: ['users'],
            queryFn: async () => (await apiClient.get<User[]>('/api/users')).data,
          });
        
        export const useDeleteUserMutation = () =>
          useMutation({
            mutationFn: async (userId: string) =>
              (await apiClient.delete(`/api/users/${userId}`)).data,
          });
        
        export const useUpdateUserMutation = () =>
          useMutation({
            mutationFn: async (user: User) =>
              (await apiClient.put<User>(`/api/users/${user._id}`, user)).data,
          });