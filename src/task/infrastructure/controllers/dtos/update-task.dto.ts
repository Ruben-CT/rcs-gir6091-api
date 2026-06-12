import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsAlpha, IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @ApiPropertyOptional({
        description: 'El estado de la tarea',
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        example: 'PENDING',
        required: false
    })
    @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'],{
        message: 'El estado debe ser PENDING, IN_PROGRESS o COMPLETED'
    })
    
    @IsOptional()
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}   