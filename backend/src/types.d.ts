// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    }
  }
}