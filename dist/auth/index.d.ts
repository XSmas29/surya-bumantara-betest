import { Request, Response, NextFunction } from 'express';
export declare const createToken: (user: any) => string;
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
