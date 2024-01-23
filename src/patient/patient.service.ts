import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schemas/patient.schema';
import { PatientModel } from '../types/contracts';
import { Model } from 'mongoose';
import { QueryParams } from '../types/query-params';
import { validateBr } from 'js-brasil';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Picture } from './schemas/picture.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientModel>,
  ) {}

  async findAll(params: QueryParams): Promise<Patient[]> {
    const queryFilters = (query: string): Record<string, any> =>
      [
        'name',
        'nickname',
        'document',
        'rg',
        'email',
        'contact.address',
        'contact.city',
        'contact.postalCode',
      ].map((x) => ({ [x]: { $regex: `.*${query}.*`, $options: 'i' } }));

    const queryFilter = !!params.query
      ? { $or: queryFilters(params.query) }
      : {};

    const patients = await this.patientModel
      .find()
      .where({ ...queryFilter })
      .sort({ [params.sort]: params.order });

    return patients.map((x) => x.toObject());
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient.toObject();
  }

  async create(dto: Patient): Promise<Patient> {
    this.validateDocument(dto);

    const existentPatient = await this.patientModel.findOne({
      $or: [{ document: dto.document }, { rg: dto.rg }, { email: dto.email }],
    });

    if (existentPatient) {
      throw new ConflictException('Patient already created');
    }

    const patient = await this.patientModel.create(dto);

    return patient.toObject();
  }

  async update(id: string, dto: Patient) {
    this.validateDocument(dto);

    const existentPatient = await this.patientModel.findById(id);

    if (!existentPatient) {
      throw new NotFoundException('Patient not found');
    }

    const patient = await this.patientModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    return patient.toObject();
  }

  async delete(id: string): Promise<void> {
    const patient = await this.patientModel.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    await this.removeImage(id);
    await this.patientModel.findByIdAndDelete(id);
  }

  async updateImage(id: string, file: Express.Multer.File) {
    const existentPatient = await this.patientModel.findById(id);

    if (!existentPatient) {
      throw new NotFoundException('Patient not found');
    }

    const name = file.filename;
    const data = fs.readFileSync(path.join('./uploads/pictures/' + name));
    const src = file.path;

    const picture: Picture = {
      name,
      src,
      base64: `data:image/${file.mimetype};base64,${data.toString('base64')}`,
    };

    await this.patientModel.findByIdAndUpdate(id, { picture });
  }

  async removeImage(id: string) {
    const patient = await this.patientModel.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    if (!patient.picture) {
      throw new NotFoundException('Patient has no picture');
    }

    fs.unlinkSync(patient.picture.src);

    await this.patientModel.findByIdAndUpdate(id, { picture: null });
  }

  private validateDocument(patient: Patient): void | never {
    const validCPF = validateBr.cpf(patient.document);
    if (!validCPF) {
      throw new UnprocessableEntityException('Invalid CPF');
    }
  }
}
