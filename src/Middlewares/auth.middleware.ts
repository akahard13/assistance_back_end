import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public excludedRoutes = ['/users/register', '/users/login'];

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    
    const currentRoute = req.originalUrl;

    if (!this.excludedRoutes.includes(currentRoute)) {
      if (!token) {
        return res.status(401).send('No token provided, you need to login to make any request.');
      }

      jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token, try to login again to make sure your token is valid.');
        }
        req['user'] = decoded;
        const { exp } = decoded as { exp: number };
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = exp - now;
        if (expiresIn <= 300) { // 300 segundos = 5 minutos
          const refreshToken = this.generateRefreshToken(decoded);
          res.setHeader('Refresh-Token', refreshToken);
        }

        next();
      });
    } else {
      next();
    }
  }
  private generateRefreshToken(decoded: any): string {
    const { sub } = decoded;
    const payload = { sub };
    const token = jwt.sign(payload, 'SecretKey', { expiresIn: '1h' });
    return token;
  }
}

