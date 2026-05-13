import { Test, TestingModule } from '@nestjs/testing';

import {
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { AuthService } from '../../../src/auth/auth.service';

import { PrismaService } from '../../../prisma/prisma.service';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('AuthService', () => {
    let service: AuthService;

    let prisma: DeepMockProxy<PrismaService>;
    let jwtService: DeepMockProxy<JwtService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: mockDeep<PrismaService>(),
                },
                {
                    provide: JwtService,
                    useValue: mockDeep<JwtService>(),
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);

        prisma = module.get(PrismaService);
        jwtService = module.get(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should login successfully', async () => {
            const dto = {
                email: 'rafael@test.com',
                password: '123456',
            };

            prisma.user.findUnique.mockResolvedValue({
                id: 1,
                name: 'Rafael',
                email: dto.email,
                password: 'hashed-password',
                role: 'OWNER',
            } as any);

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            jwtService.sign.mockReturnValue('fake-jwt');

            const result = await service.login(dto);

            expect(result.accessToken).toBe('fake-jwt');

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: {
                    email: dto.email,
                },
            });

            expect(bcrypt.compare).toHaveBeenCalledWith(
                dto.password,
                'hashed-password',
            );

            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: 1,
                email: dto.email,
                role: 'OWNER',
            });
        });

        it('should throw if user does not exist', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(
                service.login({
                    email: 'rafael@test.com',
                    password: '123456',
                }),
            ).rejects.toThrow(
                new UnauthorizedException(
                    'E-mail ou senha inválidos. Tente novamente.',
                ),
            );

            expect(jwtService.sign).not.toHaveBeenCalled();
        });

        it('should throw if password is invalid', async () => {
            prisma.user.findUnique.mockResolvedValue({
                id: 1,
                email: 'rafael@test.com',
                password: 'hashed-password',
                role: 'OWNER',
            } as any);

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

            expect(jwtService.sign).not.toHaveBeenCalled();
        });
    });

    describe('generateToken', () => {
        it('should generate a JWT token', () => {
            const user = {
                id: 1,
                email: 'rafael@test.com',
                role: 'OWNER',
            };

            jwtService.sign.mockReturnValue('fake-jwt');

            const token = service.generateToken(user);

            expect(token).toBe('fake-jwt');

            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: 1,
                email: 'rafael@test.com',
                role: 'OWNER',
            });
        });
    });
});