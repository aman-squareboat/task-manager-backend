import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetTaskUpdateHistoryById {
  id: string;
  @IsInt()
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  perPage: number;
  @IsInt()
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  pageNumber: number;
}
