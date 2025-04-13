export interface ErrorResponse {
  error: string;
  status: number;
}

export interface SuccessResponse<T> {
  data: T;
  status: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const isErrorResponse = (response: any): response is ErrorResponse => {
  return response && 'error' in response;
};