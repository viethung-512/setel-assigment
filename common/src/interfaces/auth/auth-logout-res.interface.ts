import { IServiceResponse } from '../common/service-response.interface';

export interface IAuthLogoutRes extends IServiceResponse {
  data: boolean;
}
