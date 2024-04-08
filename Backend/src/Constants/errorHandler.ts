import { Request, Response } from 'express';

const errorHandler = (res: Response, error: any) => {
  console.error('Internal server error:', error);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;

