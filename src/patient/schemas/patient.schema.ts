import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class Contact {
  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Rua Comissário Justo' })
  address: string;

  @Prop({ type: String, required: true })
  @IsPostalCode()
  @ApiProperty({ type: String, example: '97010110' })
  postalCode: string;

  @Prop({ type: String, required: false })
  @IsString()
  @ApiPropertyOptional({ type: String, example: 'Apto 0' })
  complement?: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Santa Maria' })
  city: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Centro' })
  neighborhood: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'RS' })
  uf: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: '000' })
  number: string;
}

@Schema({
  timestamps: true,
})
export class Patient {
  @Prop({ type: String, required: true, unique: true })
  @IsString()
  @ApiProperty({ type: String, example: '121477964' })
  rg: string;

  @Prop({ type: String, required: true, unique: true })
  @IsString()
  @Length(11)
  @ApiProperty({ type: String, example: '97472571067' })
  document: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Murilo' })
  name: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Thom' })
  nickname: string;

  @Prop({ type: String, required: true, unique: true })
  @IsEmail()
  @ApiProperty({ type: String, example: 'murilo@email.com' })
  email: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Brasileiro' })
  nationality: string;

  @Prop({ type: Date, required: true })
  @IsString()
  @ApiProperty({ type: String, example: '2002-04-02T13:00:00.345Z' })
  dateOfBirth: Date;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Masculino' })
  gender: string;

  @Prop({ type: String, required: true })
  @IsString()
  @ApiProperty({ type: String, example: 'Solteiro' })
  maritalStatus: string;

  @Prop({ type: String, required: false })
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: '1.82cm altura' })
  additionalObservations?: string;

  @Prop({ type: Contact, required: true })
  @ValidateNested()
  @ApiProperty({ type: Contact, example: Contact })
  contact: Contact;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
