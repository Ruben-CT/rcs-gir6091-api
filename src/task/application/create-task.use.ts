//Capa de aplicación (Caso de uso)

import {Inject, Injectable} from '@nestjs/common';
import {ITaskRepositoryToken } from '../domain/task.repository.interface';
import {ITaskRepository} from '../domain/task.repository.interface';

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository,
    ) {}