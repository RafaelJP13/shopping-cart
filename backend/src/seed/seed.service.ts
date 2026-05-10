import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(private readonly prisma: PrismaService) { }

    async run() {
        this.logger.log('🌱 Starting database seed...');

        await this.seedCompanies();
        await this.seedUsers();

        this.logger.log('✅ Database seeding completed');
    }

    private async seedCompanies() {
        const companiesCount = await this.prisma.company.count();

        if (companiesCount > 0) {
            this.logger.log('🏢 Companies already seeded, skipping...');
            return;
        }

        await this.prisma.company.createMany({
            data: [
                {
                    name: 'Nike',
                    slug: 'nike',
                    cnpj: '12.345.678/0001-90',
                },
                {
                    name: 'Coca-Cola',
                    slug: 'coca-cola',
                    cnpj: '98.765.432/0001-10',
                },
            ],
        });

        this.logger.log('🏢 Companies seeded successfully');
    }

    private async seedUsers() {
        const usersCount = await this.prisma.user.count();

        if (usersCount > 0) {
            this.logger.log('👤 Users already seeded, skipping...');
            return;
        }

        const nike = await this.prisma.company.findUnique({
            where: {
                slug: 'nike',
            },
        });

        const cocaCola = await this.prisma.company.findUnique({
            where: {
                slug: 'coca-cola',
            },
        });

        const hashedPassword = await bcrypt.hash('123456', 10);

        await this.prisma.user.createMany({
            data: [
                // PLATFORM OWNER
                {
                    name: 'Platform Owner',
                    email: 'owner@test.com',
                    password: hashedPassword,
                    role: Role.OWNER,
                },

                // NIKE ADMIN
                {
                    name: 'Nike Admin',
                    email: 'admin@nike.com',
                    password: hashedPassword,
                    role: Role.COMPANY_ADMIN,
                    companyId: nike?.id,
                },

                // NIKE EMPLOYEE
                {
                    name: 'Nike Employee',
                    email: 'employee@nike.com',
                    password: hashedPassword,
                    role: Role.EMPLOYEE,
                    companyId: nike?.id,
                },

                // COCA-COLA EMPLOYEE
                {
                    name: 'Coca-Cola Employee',
                    email: 'employee@coca.com',
                    password: hashedPassword,
                    role: Role.EMPLOYEE,
                    companyId: cocaCola?.id,
                },
            ],
        });

        this.logger.log('👤 Users seeded successfully');
    }
}