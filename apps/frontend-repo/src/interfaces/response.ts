export interface ResponseAPI<T> {
  message: string;
  data: T;
  error?: string;
}
