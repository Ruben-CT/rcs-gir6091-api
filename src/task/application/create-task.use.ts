//Capa de aplicación (Caso de uso)

import {Inject, Injectable} from "@nestjs/common";
import type {ITaskRepository} from '../domain/task.repository.interface';
import {ITaskRepositoryToken } from '../domain/task.repository.interface';
import {Task} from '../domain/task.entity';

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository,
    ){}

        async execute(title: string, description: string): Promise<Task> {
        const crypto = await import('crypto');
        const task = new Task(
          crypto.randomUUID(),
          title,
          description,
          'PENDING',
          new Date(),
        );
        return this.taskRepository.create(task);

    }
}