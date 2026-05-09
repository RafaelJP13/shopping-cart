import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(private readonly prisma: PrismaService) { }

    async run() {
        this.logger.log('🌱 Starting database seed...');

        await this.seedUsers();

        this.logger.log('✅ Database seeding completed');
    }

    private async seedUsers() {
        const usersCount = await this.prisma.user.count();

        if (usersCount > 0) {
            this.logger.log('👤 Users already seeded, skipping...');
            return;
        }

        await this.prisma.user.createMany({
            data: [
                {
                    name: 'Rafael Santos Fernandes',
                    email: 'rafael@test.com',
                    password: '123456',
                },
            ],
        });

        this.logger.log('👤 Users seeded successfully');
    }

}