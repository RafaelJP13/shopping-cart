import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException, ConflictException } from '@nestjs/common';

import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { Company } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { CompanyService } from '../../../src/company/company.service';

describe('CompanyService', () => {
    let service: CompanyService;

    let prisma: DeepMockProxy<PrismaService>;

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                providers: [
                    CompanyService,
                    {
                        provide: PrismaService,
                        useValue: mockDeep<PrismaService>(),
                    },
                ],
            }).compile();

        service =
            module.get<CompanyService>(CompanyService);

        prisma = module.get(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all companies', async () => {
            const companies: Company[] = [
                {
                    id: '1',

                    fantasyName: 'Nike',
                    legalName: 'Nike LTDA',

                    cnpj: '12345678000190',
                    cnpj_status: 'VALID',

                    representante: 'Rafael Santos',

                    adminName: 'Rafael',
                    adminEmail: 'rafael@test.com',

                    phone: '13999999999',

                    cep: '11000-000',
                    state: 'SP',
                    city: 'Santos',

                    address: 'Av Paulista 1000',

                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '2',

                    fantasyName: 'Adidas',
                    legalName: 'Adidas LTDA',

                    cnpj: '99999999999999',
                    cnpj_status: 'VALID',

                    representante: 'John Doe',

                    adminName: 'John',
                    adminEmail: 'john@test.com',

                    phone: '11999999999',

                    cep: '01000-000',
                    state: 'SP',
                    city: 'São Paulo',

                    address: 'Rua XPTO 123',

                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            prisma.company.findMany.mockResolvedValue(
                companies,
            );

            const result = await service.findAll();

            expect(result).toEqual(companies);

            expect(
                prisma.company.findMany,
            ).toHaveBeenCalled();
        });

        it('should return empty array when no companies exist', async () => {
            prisma.company.findMany.mockResolvedValue(
                [],
            );

            const result = await service.findAll();

            expect(result).toEqual([]);

            expect(
                prisma.company.findMany,
            ).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return company by id', async () => {
            const company: Company = {
                id: '1',

                fantasyName: 'Nike',
                legalName: 'Nike LTDA',

                cnpj: '12345678000190',
                cnpj_status: 'VALID',

                representante: 'Rafael Santos',

                adminName: 'Rafael',
                adminEmail: 'rafael@test.com',

                phone: '13999999999',

                cep: '11000-000',
                state: 'SP',
                city: 'Santos',

                address: 'Av Paulista 1000',

                createdAt: new Date(),
                updatedAt: new Date(),
            };

            prisma.company.findUnique.mockResolvedValue(
                company,
            );

            const result = await service.findOne('1');

            expect(result).toEqual(company);

            expect(
                prisma.company.findUnique,
            ).toHaveBeenCalledWith({
                where: {
                    id: '1',
                },
            });
        });

        it('should throw if company does not exist', async () => {
            prisma.company.findUnique.mockResolvedValue(
                null,
            );

            await expect(
                service.findOne('999'),
            ).rejects.toThrow(
                new NotFoundException(
                    'Empresa não encontrada',
                ),
            );

            expect(
                prisma.company.findUnique,
            ).toHaveBeenCalledWith({
                where: {
                    id: '999',
                },
            });
        });
    });

    describe('create', () => {
        it('should create a company successfully', async () => {
            const dto = {
                adminName: 'Rafael',
                adminEmail: 'rafael@test.com',

                representante: 'Rafael Santos',

                fantasyName: 'Nike',
                legalName: 'Nike LTDA',

                cnpj: '12345678000190',
                cnpj_status: 'VALID',

                phone: '13999999999',

                cep: '11000-000',
                state: 'SP',
                city: 'Santos',

                address: 'Av Paulista 1000',
            };

            const createdCompany: Company = {
                id: '1',

                ...dto,

                createdAt: new Date(),
                updatedAt: new Date(),
            };

            prisma.company.create.mockResolvedValue(
                createdCompany,
            );

            const result = await service.create(dto);

            expect(result).toEqual(
                createdCompany,
            );

            expect(
                prisma.company.create,
            ).toHaveBeenCalledWith({
                data: {
                    adminName: dto.adminName,
                    adminEmail: dto.adminEmail,

                    representante:
                        dto.representante,

                    fantasyName:
                        dto.fantasyName,

                    legalName:
                        dto.legalName,

                    cnpj: dto.cnpj,

                    cnpj_status:
                        dto.cnpj_status,

                    phone: dto.phone,

                    cep: dto.cep,

                    state: dto.state,

                    city: dto.city,

                    address: dto.address,
                },
            });
        });
    });

    describe('update', () => {
        it('should update a company successfully', async () => {
            const dto = {
                fantasyName: 'Nike Updated',
                cnpj: '12345678000190',
            };

            const existingCompany: Company = {
                id: '1',

                fantasyName: 'Nike',
                legalName: 'Nike LTDA',

                cnpj: '12345678000190',
                cnpj_status: 'VALID',

                representante: 'Rafael Santos',

                adminName: 'Rafael',
                adminEmail: 'rafael@test.com',

                phone: '13999999999',

                cep: '11000-000',
                state: 'SP',
                city: 'Santos',

                address: 'Av Paulista 1000',

                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const updatedCompany: Company = {
                ...existingCompany,
                fantasyName:
                    dto.fantasyName,
            };

            prisma.company.findUnique.mockResolvedValue(
                existingCompany,
            );

            prisma.company.findFirst.mockResolvedValue(
                null,
            );

            prisma.company.update.mockResolvedValue(
                updatedCompany,
            );

            const result = await service.update(
                '1',
                dto,
            );

            expect(result).toEqual(
                updatedCompany,
            );

            expect(
                prisma.company.update,
            ).toHaveBeenCalledWith({
                where: {
                    id: '1',
                },
                data: {
                    adminName: undefined,

                    adminEmail: undefined,

                    representante:
                        undefined,

                    fantasyName:
                        dto.fantasyName,

                    legalName: undefined,

                    cnpj: dto.cnpj,

                    cnpj_status:
                        undefined,

                    phone: undefined,

                    cep: undefined,

                    state: undefined,

                    city: undefined,

                    address: undefined,
                },
            });
        });

        it('should throw when company does not exist', async () => {
            prisma.company.findUnique.mockResolvedValue(
                null,
            );

            await expect(
                service.update('999', {
                    fantasyName: 'Test',
                }),
            ).rejects.toThrow(
                new NotFoundException(
                    'Empresa não encontrada',
                ),
            );
        });

        it('should throw when cnpj already exists in another company', async () => {
            const existingCompany: Company = {
                id: '1',

                fantasyName: 'Nike',
                legalName: 'Nike LTDA',

                cnpj: '12345678000190',
                cnpj_status: 'VALID',

                representante: 'Rafael Santos',

                adminName: 'Rafael',
                adminEmail: 'rafael@test.com',

                phone: '13999999999',

                cep: '11000-000',
                state: 'SP',
                city: 'Santos',

                address: 'Av Paulista 1000',

                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const duplicatedCompany: Company = {
                ...existingCompany,
                id: '2',
            };

            prisma.company.findUnique.mockResolvedValue(
                existingCompany,
            );

            prisma.company.findFirst.mockResolvedValue(
                duplicatedCompany,
            );

            await expect(
                service.update('1', {
                    cnpj: '12345678000190',
                }),
            ).rejects.toThrow(
                new ConflictException(
                    'CNPJ já está em uso',
                ),
            );
        });
    });
});