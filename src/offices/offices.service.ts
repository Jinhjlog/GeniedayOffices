import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offices } from 'src/schemas/offices.schema';
import { AddOfficesDto } from './dto/add-offices.dto';
import { UpdateOfficesDto } from './dto/update-offices.dto';

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
    const isOfficesNameDuplicate = await this.isOfficesNameDuplicate(
      addOfficesData.officesName,
    );
    if (isOfficesNameDuplicate)
      throw new HttpException(
        'offices name is duplicate',
        HttpStatus.BAD_REQUEST,
      );

    const tempData = await this.officesModel.create({
      ...addOfficesData,
    });
    return tempData;
  }

  async updateOffices(updateOfficesData: UpdateOfficesDto) {}

  async isOfficesNameDuplicate(officesName: string): Promise<boolean> {
    const officesDuplicate = await this.officesModel
      .findOne({ officesName })
      .exec();
    return !!officesDuplicate;
  }
}
