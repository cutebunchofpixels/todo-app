import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @Min(1)
  @Max(10)
  @IsNumber()
  priority: number;
}
