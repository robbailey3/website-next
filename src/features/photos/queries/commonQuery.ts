import { Transform } from 'class-transformer';
import { IsNumber, Max, Min, ValidateIf } from 'class-validator';

export class CommonQuery {
  @IsNumber()
  @Transform((value) => (value ? parseInt(value.value, 10) : 10))
  @ValidateIf((o) => o.limit)
  @Min(1)
  @Max(100)
  public limit!: number;

  @IsNumber()
  @Transform((value) => (value ? parseInt(value.value, 10) : 10))
  @ValidateIf((o) => o.skip)
  @Min(1)
  @Max(100)
  public skip!: number;
}
