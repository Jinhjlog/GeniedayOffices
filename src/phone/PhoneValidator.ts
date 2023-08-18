import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPhoneNumberValid', async: false })
export class PhoneValidator implements ValidatorConstraintInterface {
  validate(phone: string, validationArguments?: ValidationArguments) {
    return /^01\d{8,9}$/.test(phone);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid phone number';
  }
}
