import { int } from 'aws-sdk/clients/datapipeline';
import { Transform } from 'class-transformer';
import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsDateString()
  eta: string;
  @IsIn([0, 1, 2, 3])
  @Transform(({ value }) => +value)
  status: int;
}
