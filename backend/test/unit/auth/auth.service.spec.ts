
import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';

import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { AuthService } from '../../../src/auth/auth.service';

import { PrismaService } from '../../../prisma/prisma.service';

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

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should register a user successfully', async () => {
        const dto = {
            name: 'Rafael',
            email: 'rafael@test.com',
            password: '123456',
        };

        prisma.user.findUnique.mockResolvedValue(null);

        prisma.user.create.mockResolvedValue({
            id: 1,
            name: dto.name,
            email: dto.email,
            password: 'hashed-password',
            role: 'USER',
        } as any);

        jwtService.sign.mockReturnValue('fake-jwt');

        const result = await service.register(dto);

        expect(result.accessToken).toBe('fake-jwt');

        expect(prisma.user.findUnique).toHaveBeenCalled();

        expect(prisma.user.create).toHaveBeenCalled();

        expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should throw if user already exists', async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            email: 'rafael@test.com',
        } as any);

        await expect(
            service.register({
                name: 'Rafael',
                email: 'rafael@test.com',
                password: '123456',
            }),
        ).rejects.toThrow('User already exists');

        expect(prisma.user.create).not.toHaveBeenCalled();
    });

});