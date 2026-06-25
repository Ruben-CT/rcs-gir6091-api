import { PrismaService } from "@/prisma/prisma.service";
import { Task } from "@/task/domain/task.entity";
import { ITaskRepository } from "@/task/domain/task.repository.interface";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TaskRepositoryPrismaImpl implements ITaskRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(task: Task): Promise<Task> {
        const { id, ...data} = task;
        const createdTask = await this.prisma.task.create({
            data: data
        })as Task;

        return createdTask;
    }
    async findAll(): Promise<Task[]> {
        const task = await this.prisma.task.findMany({
            orderBy: { createdAt: 'desc'}
        }) as Task[];

        return task;
    }
    findById(id: number): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    update(task: Task): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}