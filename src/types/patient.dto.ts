import {
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class ContactDto {
  @IsString()
  readonly address: string;

  @IsPostalCode()
  readonly postalCode: string;

  @IsString()
  readonly complement: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly neighborhood: string;

  @IsString()
  readonly uf: string;

  @IsString()
  readonly number: string;
}

export class PatientDto {
  @IsString()
  readonly rg: string;

  @IsString()
  @Length(11)
  readonly document: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly nickname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly nationality: string;

  @IsString()
  readonly dateOfBirth: Date;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly maritalStatus: string;

  @IsOptional()
  @IsString()
  readonly additionalObservations?: string;

  @ValidateNested()
  readonly contact: ContactDto;
}
