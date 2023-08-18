import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offices } from 'src/schemas/offices.schema';
import { AddOfficesDto } from './dto/add-offices.dto';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Offices.name) private officesModel: Model<Offices>,
  ) {}

  async getOffices() {
    const officesList = await this.officesModel.find();
    return officesList;
  }

  async addOffices(addOfficesData: AddOfficesDto) {
    const isPhoneNumberDuplicate = await this.isPhoneNumberDuplicate(
      addOfficesData.adminPhoneNumber,
    );
    if (isPhoneNumberDuplicate)
      throw new HttpException(
        'Phone number is duplicate',
        HttpStatus.BAD_REQUEST,
      );

    const tempData = await this.officesModel.create({
      ...addOfficesData,
    });
    return tempData;
  }

  async isPhoneNumberDuplicate(phoneNumber: string): Promise<boolean> {
    const userWithPhoneNumber = await this.officesModel
      .findOne({ adminPhoneNumber: phoneNumber })
      .exec();
    return !!userWithPhoneNumber;
  }
}
