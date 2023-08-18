import { PartialType } from '@nestjs/mapped-types';
import { AddOfficesDto } from './add-offices.dto';

export class UpdateOfficesDto extends PartialType(AddOfficesDto) {}
