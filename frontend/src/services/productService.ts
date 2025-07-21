import {axiosInstance} from "./axiosInstance.ts";

export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface Pageable<T> {
  content: T[];
  pageable: {
    totalElements: number;
    numberOfElements: number;
    totalPages: number;
    size: number;
    last: boolean;
    first: boolean;
    empty: boolean;
  };
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
  const response = await axiosInstance.get('/products/search', { params });
  return response.data.data;
}

export const updateProduct = async (id: number, description: string): Promise<Product> => {
  const response = await axiosInstance.put(`/products/${id}`, { description });
  return response.data.data;
} 