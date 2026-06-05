import { Module } from "@nestjs/common";
import { CreateTaskUseCase } from "../application/create-task.use";
import { TaskRepositoryImpl } from "./persistence/task.repository.impl";

@Module({
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        {
            provide: "ITaskRepositoryToken",
            useClass: TaskRepositoryImpl  //Cambiar si la DB cambia 
        }
    ],
    exports: []
})
export class TaskModule {}
