import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MinLength,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  IsEmpty,
} from 'class-validator';
import { Contact } from './contact.schema';
import { Picture } from './picture.schema';

@Schema({
  timestamps: true,
})
export class Patient {
  @Prop({ type: String, required: true, unique: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: '121477964' })
  rg: string;

  @Prop({ type: String, required: true, unique: true })
  @IsString()
  @MinLength(1)
  @Length(11)
  @ApiProperty({ type: String, example: '97472571067' })
  document: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Murilo' })
  name: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Thom' })
  nickname: string;

  @Prop({ type: String, required: true, unique: true })
  @IsEmail()
  @ApiProperty({ type: String, example: 'murilo@email.com' })
  email: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Brasileiro' })
  nationality: string;

  @Prop({ type: Date, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: '2002-04-02T13:00:00.345Z' })
  dateOfBirth: Date;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, example: 'Masculino' })
  gender: string;

  @Prop({ type: String, required: true })
  @IsString()
  @MinLength(1)
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

  @Prop({ type: Picture, required: false })
  @IsEmpty()
  @ApiPropertyOptional({ type: Picture, example: Picture })
  picture: Picture;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
