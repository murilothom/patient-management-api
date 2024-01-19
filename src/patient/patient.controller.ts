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
import { QueryParams } from '../types/query-params';
import { ApiResponse } from '@nestjs/swagger';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [Patient],
    description: 'Listagem de pacientes',
  })
  findAll(@Query() params: QueryParams): Promise<Patient[]> {
    return this.patientService.findAll(params);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Patient,
    description: 'Busca paciente por ID',
  })
  findById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: Patient,
    description: 'Criação de paciente',
  })
  create(@Body() dto: Patient): Promise<Patient> {
    return this.patientService.create(dto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: Patient,
    description: 'Atualização dos dados do paciente',
  })
  update(@Param('id') id: string, @Body() dto: Patient): Promise<Patient> {
    return this.patientService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    type: Patient,
    description: 'Deleção do paciente',
  })
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.patientService.delete(id);
  }
}
