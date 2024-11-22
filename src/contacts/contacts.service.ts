import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import Contact from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import User from 'src/users/entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAllContacts(userId: number): Promise<Contact[]> {
    try {
      return await this.contactRepository.find({where: {user: {id: userId}}});
      
    } catch (error) {
      console.log(error)
    }
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    // Buscar al usuario asociado por el userId
    const user = await this.userRepository.findOne({where: {id: createContactDto.user_id}});

    // Verificar si el usuario existe
    if (!user) {
      throw new Error('User not found');
    }

    // Crear el nuevo contacto con el userId
    const contact = this.contactRepository.create({
      ...createContactDto,
      user,  // Asociamos el contacto al usuario
    });

    // Guardar el contacto y devolverlo
    return await this.contactRepository.save(contact);
  }

  async updateContact(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    await this.contactRepository.update(id, updateContactDto);
    return await this.contactRepository.findOneBy({ id });
  }

  async deleteContact(id: number): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error('Contacto no encontrado');
    }
    await this.contactRepository.delete({ id });
    return;
  }
}