import { IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

export class QueryParams {
  @IsString()
  readonly sort: string;

  @IsString()
  readonly order: SortOrder;

  @IsOptional()
  @IsString()
  readonly query?: string;
}
