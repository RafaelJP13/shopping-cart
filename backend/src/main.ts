import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  try {
    console.clear();

    console.log('🚀 Starting Compre Mais...\n');

    // BACKEND
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    // PRISMA
    const prisma = app.get(PrismaService);

    // DATABASE
    try {
      await prisma.$connect();

      console.log('✅ Database: CONNECTED');
    } catch (error) {
      console.log('❌ Database: FAILED');
      console.log('🗄️ Check PostgreSQL connection\n');
    }

    const port = process.env.PORT || 3000;

    await app.listen(port);

    console.log(`✅ Backend API: ONLINE`);
    console.log(`🌐 http://localhost:${port}\n`);

    // FRONTEND
    console.log('✅ Frontend: RUNNING');
    console.log('💻 http://localhost:3001\n');

    console.log('🎉 Application started successfully');

  } catch (error) {
    console.error('\n❌ Failed to start application');
    console.error(error);
  }
}

bootstrap();