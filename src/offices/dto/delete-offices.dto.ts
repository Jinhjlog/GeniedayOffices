import { Offices } from '../offices.schema';
import { PickType } from '@nestjs/swagger';

export class DeleteOfficesDto extends PickType(Offices, [
  'officesName',
] as const) {}
