import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ReadOnlyOfficesDto } from './dto/offices.dto';
import { DeleteOfficesDto } from './dto/delete-offices.dto';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @ApiResponse({
    status: 200,
    description: '구청 전체 조회 성공',
    type: [ReadOnlyOfficesDto],
  })
  @ApiOperation({ summary: '구청 전체 조회' })
  @Get('')
  getOffices() {
    return this.officesService.getOffices();
  }

  @ApiResponse({
    status: 201,
    description: '구청 생성 성공',
    type: ReadOnlyOfficesDto,
  })
  @ApiResponse({
    status: 401,
    description: '구청 이름 중복',
  })
  @Post('')
  @ApiOperation({ summary: '구청 생성' })
  createOffices(@Body() createOfficesDto: ReadOnlyOfficesDto) {
    return this.officesService.createOffices(createOfficesDto);
  }

  @ApiResponse({
    status: 200,
    description: '구청 정보 수정 성공',
    type: ReadOnlyOfficesDto,
  })
  @ApiResponse({
    status: 401,
    description: '해당 구청이 존재하지 않음',
  })
  @Put('')
  @ApiOperation({ summary: '구청 정보 수정' })
  updateOffices(@Body() updateOfficesData: ReadOnlyOfficesDto) {
    return this.officesService.updateOffices(updateOfficesData);
  }

  @ApiResponse({
    status: 200,
    description: '구청 삭제 성공',
    type: DeleteOfficesDto,
  })
  @ApiResponse({
    status: 401,
    description: 'offices name is not exists',
  })
  @Delete(':officesName')
  @ApiOperation({ summary: '구청 삭제' })
  deleteOffices(@Param('officesName') officesName: string) {
    return this.officesService.deleteOffices(officesName);
  }
}
