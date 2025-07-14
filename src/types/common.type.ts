import type { JwtPayload } from 'jsonwebtoken';
import type { IUser } from './user.type';

declare global {
  namespace Express {
    export interface User extends IUser { } // Extending Passport's User type
  }
}
export interface IApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: any | undefined;
}

export interface ImportedModule {
  default?: object;
}

export interface AuthTokenPayload extends JwtPayload {
  id: string;
}

export interface CustomError extends Error {
  statusCode?: number;
  success?: boolean;
  error?: any;
}