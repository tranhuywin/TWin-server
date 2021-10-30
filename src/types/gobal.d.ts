//import * as global from './global'; // ignore
import { UserDocument } from 'users/models/user.model';

declare global {
  interface IStatusResult {
    status: string;
    details?: string;
  }
}