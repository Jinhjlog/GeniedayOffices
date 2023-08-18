import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { AddOfficesDto } from './dto/add-offices.dto';
import { UpdateOfficesDto } from './dto/update-offices.dto';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Get('')
  getOffices() {
    return this.officesService.getOffices();
  }

  @Post('')
  addOffices(@Body() addOfficesData: AddOfficesDto) {
    return this.officesService.addOffices(addOfficesData);
  }

  @Put('')
  updateOffices(@Body() updateOfficesData: UpdateOfficesDto) {
    return this.officesService.updateOffices(updateOfficesData);
  }

  @Delete('')
  deleteOffices() {}
}
