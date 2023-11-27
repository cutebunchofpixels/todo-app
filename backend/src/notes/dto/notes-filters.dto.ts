import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  IsBoolean,
} from 'class-validator';
import { OneOf } from 'src/common/validation/one-of';

const orderProps = ['priority'];
const orderDirections = ['ASC', 'DESC'];

export class NoteFiltersDto {
  @IsOptional()
  @IsString()
  text?: string;

  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  take? = Number.MAX_SAFE_INTEGER;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  skip? = 0;

  @Validate(OneOf, orderProps)
  @IsOptional()
  @IsString()
  orderBy?: string;

  @Validate(OneOf, orderDirections)
  @IsOptional()
  @IsString()
  orderDirection?: string = 'ASC';
}
