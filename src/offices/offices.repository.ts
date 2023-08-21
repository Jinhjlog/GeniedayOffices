import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offices } from './offices.schema';
import { AddOfficesDto } from './dto/add-offices.dto';
import { UpdateOfficesDto } from './dto/update-offices.dto';

@Injectable()
export class OfficesRepository {
  constructor(
    @InjectModel(Offices.name) private readonly officeModel: Model<Offices>,
  ) {}

  async getOfficesList() {
    return await this.officeModel.find();
  }

  async existsByOfficesName(officesName: string): Promise<boolean> {
    const result = await this.officeModel.exists({ officesName });
    return !!result;
  }

  async createOffices(addOfficesData: AddOfficesDto) {
    return await this.officeModel.create({
      ...addOfficesData,
    });
  }

  async updateOffices(updateOfficesData: UpdateOfficesDto) {
    const result = await this.officeModel.updateOne(
      {
        officesName: updateOfficesData.officesName,
      },
      updateOfficesData,
    );
    return result;
  }

  async deleteOffices(deleteOfficesName: string) {
    return await this.officeModel.deleteOne({
      officesName: deleteOfficesName,
    });
  }
}
