import { Controller, Post, Body, Param, Get, Query, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('contact')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Get()
  async findAll(@Query('user') userId: number) {
    return this.contactService.findAllContacts(userId);
  }

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.updateContact(id, updateContactDto);
  }

  @Delete()
  async deleteContact(@Query('id') id: number):Promise<void> {
    return this.contactService.deleteContact(id);
  }
}