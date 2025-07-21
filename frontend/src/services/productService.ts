import {axiosInstance} from "./axiosInstance.ts";
import type {BaseResponse, Pageable} from "../models/api.ts";

export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface ProductSearchParams {
  name?: string;
  description?: string;
  page?: number;
  size?: number;
  sortDir?: 'asc' | 'desc';
  sortBy?: string;
}

export const getProducts = async (params: ProductSearchParams): Promise<Pageable<Product>> => {
  const response = await axiosInstance.get<BaseResponse<Pageable<Product>>>('/products/search', { params });
  return response.data.data;
}

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.put<BaseResponse<Product>>(`/products/${product.id}`, product);
  return response.data.data;
}

export const getProductById = async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<BaseResponse<Product>>(`/products/${id}`);
    return response.data.data;
}

export const createProduct = async (product: { name: string, description: string }): Promise<Product> => {
    const response = await axiosInstance.post<BaseResponse<Product>>('/products', product);
    return response.data.data;
}

export const deleteProduct = async (id: number): Promise<void> => {
    await axiosInstance.delete<BaseResponse<null>>(`/products/${id}`);
} 