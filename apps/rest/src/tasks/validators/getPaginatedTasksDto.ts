import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetPaginatedTasksDto {
  @IsInt()
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  tasksPerPage: number;

  @IsInt()
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  pageNumber: number;
}
