export interface PaginationResponse<T> {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  docs: T[];
}
