import { IsNotEmpty, Validate, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PhoneValidator } from 'src/phone/PhoneValidator';

export class AddOfficesDto {
  @IsNotEmpty()
  @IsString()
  officesName: string;

  @IsNotEmpty()
  @IsString()
  officesAddress: string;

  @IsNotEmpty()
  @IsString()
  adminName: string;

  @IsNotEmpty()
  @Validate(PhoneValidator, { message: 'Invalid phone number' })
  adminPhoneNumber: string;
}
