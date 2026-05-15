import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: any) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async login(data: any) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = this.generateTokens(user);

        return tokens;
    }

    generateTokens(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}