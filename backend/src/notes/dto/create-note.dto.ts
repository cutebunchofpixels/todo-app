import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @Min(1)
  @Max(10)
  @IsNumber()
  priority: number;
}
