"use client"

import { login, logout, register, verify } from "@/services/auth"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAuth = () => {
  const queryClient = useQueryClient()

  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: verify,
    retry: false
  })

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
        toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    }
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
        console.log(data,'make i see')
       toast.success(`Welcome back, ${data.user.name}!`);
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    }
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess:()=>{
     queryClient.setQueryData(["auth"], null);
    }
  })

  return {
    user: authQuery.data,
    isLoading: authQuery.isLoading,
    isAuthenticated: !!authQuery.data,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation
  }
}
