import { IServiceResponse } from '../common/service-response.interface';
import { User } from '../user/user.interface';

export interface IAuthGetMeRes extends IServiceResponse {
  data: User | null;
}
