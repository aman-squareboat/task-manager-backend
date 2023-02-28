import { Exists } from '@libs/boat/validator';
import { IsNotEmpty } from 'class-validator';

export class GetTaskByIdDto {
  @Exists({
    table: 'tasks',
    column: 'ulid',
  })
  @IsNotEmpty()
  id: string;
}
