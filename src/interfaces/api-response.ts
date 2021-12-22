export interface ApiResponse<T> {
  statusCode: number;
  result: T;
  timestamp: number;
}
