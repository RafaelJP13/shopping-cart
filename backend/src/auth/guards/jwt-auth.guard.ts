import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();

        const token = req.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });

            req.user = payload;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}