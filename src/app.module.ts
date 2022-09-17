import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma.module';
import { AuthorController } from './controllers/author.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, AuthorController],
  providers: [AppService],
})
export class AppModule {}
