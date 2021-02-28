export interface IServiceResponse {
  status: number;
  message: string;
  errors: { [key: string]: any };
}
