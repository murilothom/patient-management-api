import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schemas/patient.schema';
import { PatientModel } from '../types/contracts';
import { Model } from 'mongoose';
import { QueryParams } from '../types/query-params';

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
    const patient = await this.patientModel.findOne({
      $or: [{ document: dto.document }, { rg: dto.rg }, { email: dto.email }],
    });

    if (patient) {
      throw new ConflictException('Patient already created');
    }

    return this.patientModel.create(dto);
  }

  async update(id: string, dto: Patient) {
    const patient = await this.patientModel.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.patientModel.findByIdAndUpdate(patient.id, dto, { new: true });
  }

  async delete(id: string): Promise<void> {
    const patient = await this.patientModel.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    await this.patientModel.findByIdAndDelete(patient.id);
  }
}
