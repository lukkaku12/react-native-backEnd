import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    name?: string;
    last_name?: string;
    phone_number?: string;
    picture_uri?: string;
  
}
