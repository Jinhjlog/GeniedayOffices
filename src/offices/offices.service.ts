import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offices } from 'src/offices/offices.schema';
import { AddOfficesDto } from './dto/add-offices.dto';
import { UpdateOfficesDto } from './dto/update-offices.dto';
import { OfficesRepository } from './offices.repository';

@Injectable()
export class OfficesService {
  constructor(private readonly officesRepository: OfficesRepository) {}

  async getOffices() {
    const officesList = await this.officesRepository.getOfficesList();
    return officesList;
  }

  async createOffices(addOfficesData: AddOfficesDto) {
    const isOfficesNameDuplicate =
      await this.officesRepository.existsByOfficesName(
        addOfficesData.officesName,
      );
    if (isOfficesNameDuplicate)
      throw new UnauthorizedException('offices name is duplicate');

    const createOfficesData = await this.officesRepository.createOffices(
      addOfficesData,
    );
    return createOfficesData;
  }

  async updateOffices(updateOfficesData: UpdateOfficesDto) {
    const isOfficesNameExist = await this.officesRepository.existsByOfficesName(
      updateOfficesData.officesName,
    );
    if (!isOfficesNameExist) {
      throw new UnauthorizedException('offices name is not exists');
    }
    return await this.officesRepository.updateOffices(updateOfficesData);
  }

  async deleteOffices(deleteOfficesName: string) {
    const isOfficesNameExist = await this.officesRepository.existsByOfficesName(
      deleteOfficesName,
    );
    if (!isOfficesNameExist) {
      throw new UnauthorizedException('offices name is not exists');
    }

    return await this.officesRepository.deleteOffices(deleteOfficesName);
  }
}
