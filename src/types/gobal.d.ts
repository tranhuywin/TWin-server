//import * as global from './global'; // ignore
import { UserDocument } from 'users/models/user.model';

declare global {
  interface IStatusResult {
    status: string;
    details?: string;
  }
  interface IJwtPayload {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
    role: string;
  }
}