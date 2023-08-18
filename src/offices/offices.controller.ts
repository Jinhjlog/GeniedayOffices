import { Body, Controller, Get, Post } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { AddOfficesDto } from './dto/add-offices.dto';

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
}
