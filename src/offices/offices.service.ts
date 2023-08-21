import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Offices } from 'src/offices/offices.schema';
import { OfficesRepository } from './offices.repository';
import { ReadOnlyOfficesDto } from './dto/offices.dto';

@Injectable()
export class OfficesService {
  constructor(private readonly officesRepository: OfficesRepository) {}

  async getOffices(): Promise<Offices[]> {
    return await this.officesRepository.getOfficesList();
  }

  async createOffices(createOfficesData: ReadOnlyOfficesDto) {
    const isOfficesNameDuplicate =
      await this.officesRepository.existsByOfficesName(
        createOfficesData.officesName,
      );
    if (isOfficesNameDuplicate)
      throw new UnauthorizedException('offices name is duplicate');

    const dbResult = await this.officesRepository.createOffices(
      createOfficesData,
    );
    return dbResult.officesReadOnlyData;
  }

  async updateOffices(
    updateOfficesData: ReadOnlyOfficesDto,
  ): Promise<ReadOnlyOfficesDto> {
    const isOfficesNameExist = await this.officesRepository.existsByOfficesName(
      updateOfficesData.officesName,
    );
    if (!isOfficesNameExist) {
      throw new UnauthorizedException('offices name is not exists');
    }
    const dbResult = await this.officesRepository.updateOffices(
      updateOfficesData,
    );
    return dbResult.acknowledged ? updateOfficesData : null;
  }

  async deleteOffices(deleteOfficesName: string) {
    const isOfficesNameExist = await this.officesRepository.existsByOfficesName(
      deleteOfficesName,
    );
    if (!isOfficesNameExist) {
      throw new UnauthorizedException('offices name is not exists');
    }

    const dbResult = await this.officesRepository.deleteOffices(
      deleteOfficesName,
    );
    return dbResult.acknowledged
      ? {
          officesName: deleteOfficesName,
        }
      : null;
  }
}
