import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsPostalCode, IsOptional } from 'class-validator';

export class Contact {
  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Rua Comissário Justo' })
  address: string;

  @Prop({ type: String, required: true })
  @IsPostalCode()
  @ApiProperty({ type: String, example: '97010110' })
  postalCode: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: 'Apto 0' })
  complement?: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Santa Maria' })
  city: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Centro' })
  neighborhood: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'RS' })
  uf: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: '000' })
  number: string;
}
