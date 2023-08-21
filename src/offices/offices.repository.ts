import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offices } from './offices.schema';
import { ReadOnlyOfficesDto } from './dto/offices.dto';

@Injectable()
export class OfficesRepository {
  constructor(
    @InjectModel(Offices.name) private readonly officeModel: Model<Offices>,
  ) {}

  async getOfficesList(): Promise<Offices[]> {
    return await this.officeModel.find();
  }

  async existsByOfficesName(officesName: string): Promise<boolean> {
    const result = await this.officeModel.exists({ officesName });
    return !!result;
  }

  async createOffices(createOfficesDto: ReadOnlyOfficesDto) {
    return await this.officeModel.create({
      ...createOfficesDto,
    });
  }

  async updateOffices(updateOfficesData: ReadOnlyOfficesDto) {
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
