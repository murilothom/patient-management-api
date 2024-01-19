import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

export class QueryParams {
  @IsString()
  @ApiProperty({ type: String, example: 'createdAt' })
  readonly sort: string;

  @IsString()
  @ApiProperty({ type: String, example: 'desc' })
  readonly order: SortOrder;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: 'John Doe' })
  readonly query?: string;
}
