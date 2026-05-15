import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { AuthService } from '../../../src/auth/auth.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;

    const prismaService = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };

    const jwtService = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        process.env.JWT_SECRET = 'mysecret';
        process.env.JWT_REFRESH_SECRET = 'myrefreshsecret';

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: prismaService,
                },
                {
                    provide: JwtService,
                    useValue: jwtService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);

        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should login successfully', async () => {
            const dto = {
                email: 'rafael@test.com',
                password: '123456',
            };

            const user = {
                id: 1,
                name: 'Rafael',
                email: dto.email,
                password: 'hashed-password',
                role: 'OWNER',
            };

            prismaService.user.findUnique.mockResolvedValue(user);

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            jwtService.sign
                .mockReturnValueOnce('access-token')
                .mockReturnValueOnce('refresh-token');

            const result = await service.login(dto);

            expect(prismaService.user.findUnique).toHaveBeenCalledWith({
                where: {
                    email: dto.email,
                },
            });

            expect(bcrypt.compare).toHaveBeenCalledWith(
                dto.password,
                user.password,
            );

            expect(jwtService.sign).toHaveBeenNthCalledWith(
                1,
                {
                    sub: 1,
                    email: dto.email,
                    role: 'OWNER',
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '15m',
                },
            );

            expect(jwtService.sign).toHaveBeenNthCalledWith(
                2,
                {
                    sub: 1,
                    email: dto.email,
                    role: 'OWNER',
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            );

            expect(result).toEqual({
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            });
        });

        it('should throw if user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(
                service.login({
                    email: 'notfound@test.com',
                    password: '123456',
                }),
            ).rejects.toThrow(
                new UnauthorizedException(
                    'E-mail ou senha inválidos. Tente novamente.',
                ),
            );
        });

        it('should throw if password is invalid', async () => {
            const user = {
                id: 1,
                email: 'rafael@test.com',
                password: 'hashed-password',
                role: 'OWNER',
            };

            prismaService.user.findUnique.mockResolvedValue(user);

            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(
                service.login({
                    email: 'rafael@test.com',
                    password: 'wrong-password',
                }),
            ).rejects.toThrow(
                new UnauthorizedException(
                    'E-mail ou senha inválidos. Tente novamente.',
                ),
            );
        });
    });

    describe('generateTokens', () => {
        it('should generate access and refresh tokens', () => {
            const user = {
                id: 1,
                email: 'rafael@test.com',
                role: 'OWNER',
            };

            jwtService.sign
                .mockReturnValueOnce('fake-access-token')
                .mockReturnValueOnce('fake-refresh-token');

            const tokens = service.generateTokens(user);

            expect(jwtService.sign).toHaveBeenNthCalledWith(
                1,
                {
                    sub: 1,
                    email: user.email,
                    role: user.role,
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '15m',
                },
            );

            expect(jwtService.sign).toHaveBeenNthCalledWith(
                2,
                {
                    sub: 1,
                    email: user.email,
                    role: user.role,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            );

            expect(tokens).toEqual({
                accessToken: 'fake-access-token',
                refreshToken: 'fake-refresh-token',
            });
        });
    });
});