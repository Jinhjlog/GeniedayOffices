import { Offices } from '../offices.schema';
import { PickType } from '@nestjs/swagger';

export class ReadOnlyOfficesDto extends PickType(Offices, [
  'officesName',
  'officesAddress',
  'adminName',
  'adminPhoneNumber',
] as const) {}
