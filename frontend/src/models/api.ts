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

export interface ValidationErrorResponse {
  [key: string]: string;
}

export interface BaseResponse<T> {
  error: boolean;
  traceId: string;
  message: string;
  data: T;
  validationErrors?: ValidationErrorResponse;
  businessErrorCode?: number;
} 