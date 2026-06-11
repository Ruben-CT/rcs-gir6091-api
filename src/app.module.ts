import { Module } from '@nestjs/common';
import { TaskModule } from './task/infrastructure/task.module';

@Module({
  imports: [
    TaskModule
  ],
})
export class AppModule {}
