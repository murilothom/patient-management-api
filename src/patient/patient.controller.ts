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
  Patch,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './schemas/patient.schema';
import { QueryParams } from '../types/query-params';
import { ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../lib/multer/config';

const parseFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 500000 }),
    new FileTypeValidator({ fileType: /^(image\/jpeg|image\/png)$/ }),
  ],
});

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

  @Patch(':id/picture')
  @ApiResponse({
    status: 204,
    description: 'Upload da image do paciente',
  })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @HttpCode(204)
  updateImage(
    @Param('id') id: string,
    @UploadedFile(parseFilePipe) file: Express.Multer.File,
  ): Promise<void> {
    return this.patientService.updateImage(id, file);
  }

  @Delete(':id/picture')
  @ApiResponse({
    status: 204,
    description: 'Deleção da image do paciente',
  })
  @HttpCode(204)
  deleteImage(@Param('id') id: string): Promise<void> {
    return this.patientService.removeImage(id);
  }
}
