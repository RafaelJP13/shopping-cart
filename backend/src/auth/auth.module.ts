import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!jwtSecret || !jwtRefreshSecret) {
    throw new Error('JWT secrets are not defined');
}
@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),

        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: '15m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }