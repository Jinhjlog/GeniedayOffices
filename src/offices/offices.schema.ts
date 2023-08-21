import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Offices extends Document {
  @Prop()
  officesName: String;

  @Prop()
  officesAddress: String;

  @Prop()
  adminName: String;

  @Prop()
  adminPhoneNumber: String;
}

export const OfficesSchema = SchemaFactory.createForClass(Offices);
