// src/latitude/latitude.controller.ts
import { Controller, Post, Body, Put, Param, Get, NotFoundException, Query } from '@nestjs/common';
import { LatitudeService } from './latitude.service';
import { CreateLatitudeDto } from './dto/create-latitude.dto';
import { UpdateLatitudeDto } from './dto/update-latitude.dto';
import { Latitude } from './entities/latitude.entity';

@Controller('latitude')
export class LatitudeController {
    constructor(private readonly latitudeService: LatitudeService) {}

    @Get('/:id')
    async findContactLongitude(@Param('id') id: number): Promise<Latitude> {
        return await this.latitudeService.findContactLatitude(+id);
    }

    @Get('/contact/:contactId')
  async findLatitudeByContactId(@Param('contactId') contactId: number) {
    const latitude = await this.latitudeService.findLatitudeByContactId(contactId);
    return latitude;
  }

    @Post()
    async create(@Body() createLatitudeDto: CreateLatitudeDto) {
        return this.latitudeService.createLatitude(createLatitudeDto);
    }

    @Put()
    async update(@Query('id') id: number, @Body() updateLatitudeDto: UpdateLatitudeDto) {
        return this.latitudeService.updateLatitude(id, updateLatitudeDto);
    }
}