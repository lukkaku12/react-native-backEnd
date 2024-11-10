import { Module } from '@nestjs/common';
import { LatitudeService } from './latitude.service';
import { LatitudeController } from './latitude.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Latitude } from './entities/latitude.entity';
import Contact from 'src/contacts/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Latitude, Contact])],
  controllers: [LatitudeController],
  providers: [LatitudeService],
})
export class LatitudeModule {}
