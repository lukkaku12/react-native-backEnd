// src/longitude/longitude.controller.ts
import { Controller, Post, Body, Put, Get, Param, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { LongitudeService } from './longitude.service';
import { CreateLongitudeDto } from './dto/create-longitude.dto';
import { UpdateLongitudeDto } from './dto/update-longitude.dto';
import Longitude from './entities/longitude.entity';

@Controller('longitude')
export class LongitudeController {
    constructor(private readonly longitudeService: LongitudeService) {}

    @Get('/:id')
    async findContactLongitude(@Param('id') id: number): Promise<Longitude> {
        return await this.longitudeService.findContactLongitude(+id);
    }

    @Get('/contact/:contactId')
    async findLongitudeByContactId(@Param('contactId') contactId: number) {
      const longitude = await this.longitudeService.findLongitudeByContactId(contactId);
      return longitude;
    }
    @Post()
    async create(@Body() createLongitudeDto: CreateLongitudeDto) {
        return this.longitudeService.createLongitude(createLongitudeDto);
    }
    @Put()
async update(@Query('id') id: number, @Body() updateLongitudeDto: UpdateLongitudeDto) {
    return this.longitudeService.updateLongitude(id,updateLongitudeDto);
}
}