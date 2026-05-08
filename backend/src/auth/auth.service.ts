import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: RegisterDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
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

        const token = this.generateToken(user);

        return {
            user,
            accessToken: token,
        };
    }

    async login(data: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail ou senha inválidos. Tente novamente.');
        }

        const passwordMatch = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('E-mail ou senha inválidos. Tente novamente.');
        }

        const token = this.generateToken(user);

        return {
            user,
            accessToken: token,
        };
    }

    generateToken(user: any) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
    }
}