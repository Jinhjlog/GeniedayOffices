import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, Validate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Offices extends Document {
  @ApiProperty({
    example: '부산진구청',
    description: 'officesName',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  officesName: string;

  @ApiProperty({
    example: '부산광역시 부산 진구 가 2동 112-1',
    description: 'officesAddress',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  officesAddress: string;

  @ApiProperty({
    example: '진현준',
    description: 'adminName',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  adminName: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'adminPhoneNumber',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  adminPhoneNumber: string;

  readonly officesReadOnlyData: {
    officesName: string;
    officesAddress: string;
    adminName: string;
    adminPhoneNumber: string;
  };
}

export const OfficesSchema = SchemaFactory.createForClass(Offices);

OfficesSchema.virtual('officesReadOnlyData').get(function (this: Offices) {
  return {
    officesName: this.officesName,
    officesAddress: this.officesAddress,
    adminName: this.adminName,
    adminPhoneNumber: this.adminPhoneNumber,
  };
});
