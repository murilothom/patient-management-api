import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './schemas/patient.schema';
import { PatientDto } from '../types/patient.dto';
import { QueryParams } from '../types/query-params';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  findAll(@Query() params: QueryParams): Promise<Patient[]> {
    return this.patientService.findAll(params);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findById(id);
  }

  @Post()
  create(@Body() dto: PatientDto): Promise<Patient> {
    return this.patientService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PatientDto): Promise<Patient> {
    return this.patientService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.patientService.delete(id);
  }
}
