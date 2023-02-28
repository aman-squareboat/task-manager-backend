import { Exists } from '@libs/boat/validator';
import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDateString, IsIn, IsOptional } from 'class-validator';

export class UpdateTaskByIdDto {
  @Exists({
    table: 'tasks',
    column: 'ulid',
  })
  id: string;
  @IsDateString()
  @IsOptional()
  eta: string;
  @IsIn([0, 1, 2, 3])
  @Transform(({ value }) => +value)
  @IsOptional()
  status: number;
}
