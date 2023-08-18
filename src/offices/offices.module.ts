import { Module } from '@nestjs/common';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Offices, OfficesSchema } from '../schemas/offices.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offices.name,
        schema: OfficesSchema,
      },
    ]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
