import {
    Controller,
    Post,
    Body,
    Res,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';

import type { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('register')
    async register(
        @Body() body: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.register(body);
        const tokens = this.authService.generateTokens(user);

        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: 'lax',
            maxAge: 1000 * 60 * 15,
        });

        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return user;
    }

    @Post('login')
    async login(
        @Body() body: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.login(body);

        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 15,
        });

        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return { message: 'Logged in successfully' };
    }

    @Post('refresh')
    refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token = req.cookies?.refresh_token;

        if (!token) {
            throw new UnauthorizedException('No refresh token found');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const newAccessToken = this.jwtService.sign(
                {
                    sub: payload.sub,
                    email: payload.email,
                    role: payload.role,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '15m',
                },
            );

            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 15,
            });

            return { message: 'Token refreshed' };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }


    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        return { message: 'Logged out' };
    }

    @UseGuards(JwtAuthGuard)
    @Post('me')
    me(@Req() req: any) {
        return req.user;
    }
}