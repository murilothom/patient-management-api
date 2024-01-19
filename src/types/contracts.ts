import { Document } from 'mongoose';
import { Patient } from '../patient/schemas/patient.schema';

export type PatientModel = Patient & Document;
