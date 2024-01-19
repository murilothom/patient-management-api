import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class Contact {
  @Prop({ required: true })
  address: string;

  @Prop({ type: String })
  postalCode: string;

  @Prop({ type: String })
  complement: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  neighborhood: string;

  @Prop({ type: String })
  uf: string;

  @Prop({ type: String })
  number: string;
}

@Schema({
  timestamps: true,
})
export class Patient {
  @Prop({ type: String, required: true, unique: true })
  rg: string;

  @Prop({ type: String, required: true, unique: true })
  document: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  nationality: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String, required: true })
  gender: string;

  @Prop({ type: String, required: true })
  maritalStatus: string;

  @Prop({ type: String, required: false })
  additionalObservations?: string;

  @Prop({ type: Contact, required: true })
  contact: Contact;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
