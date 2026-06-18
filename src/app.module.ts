import { Module } from '@nestjs/common';
import { TasksModule } from './task/infrastructure/task.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TasksModule
  ],
})
export class AppModule {}
