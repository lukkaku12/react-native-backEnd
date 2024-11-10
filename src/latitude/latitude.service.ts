import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLatitudeDto } from './dto/create-latitude.dto';
import { UpdateLatitudeDto } from './dto/update-latitude.dto';
import { Latitude } from './entities/latitude.entity';
import Contact from 'src/contacts/entities/contact.entity';

@Injectable()
export class LatitudeService {
    constructor(
        @InjectRepository(Latitude)
        private readonly latitudeRepository: Repository<Latitude>,
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) {}

    async findContactLatitude(id: number): Promise<Latitude> {
        if (isNaN(id)) {
            throw new InternalServerErrorException(`El ID proporcionado no es válido: ${id}`);
        }
        
        try {
            const response = await this.latitudeRepository.findOne({
                where: { contact: { id } },
            });
            
            if (!response) {
                throw new NotFoundException(`Latitud no encontrada para el ID de contacto: ${id}`);
            }

            return response;
        } catch (error) {
            console.error('Error al buscar la latitud:', error);
            throw new InternalServerErrorException('Error al buscar la latitud');
        }
    }

    async createLatitude(createLatitudeDto: CreateLatitudeDto): Promise<Latitude> {
        const { contact_id, latitude } = createLatitudeDto;
      
        // Busca el contacto usando el contact_id proporcionado
        const contact = await this.contactRepository.findOne({ where: { id: contact_id } });
        if (!contact) {
          throw new NotFoundException(`Contacto con ID ${contact_id} no encontrado`);
        }
      
        // Crea una nueva instancia de Latitude y asigna el contacto
        const newLatitude = this.latitudeRepository.create({
          latitude,
          contact, // Asigna la entidad completa, no solo el ID
        });
      
        // Guarda la entidad en la base de datos
        return await this.latitudeRepository.save(newLatitude);
      }

    async findLatitudeByContactId(contactId: number): Promise<Latitude> {
        const latitude = await this.latitudeRepository.findOne({ where: { contact: { id: contactId } } });
        return latitude;
      }

      async updateLatitude(contact_id: number, updateLatitudeDto: UpdateLatitudeDto): Promise<Latitude> {
        const { ...updateData } = updateLatitudeDto;
    
    
        // Actualizar usando el contact_id
        const updateResult = await this.latitudeRepository
            .createQueryBuilder()
            .update(Latitude)
            .set(updateData)
            .where("contactId = :contactId", { contactId: contact_id })
            .execute();
    
        if (updateResult.affected === 0) {
            throw new NotFoundException(`Latitud no encontrada para el contacto con ID: ${contact_id}`);
        }
    
        const updatedLatitude = await this.latitudeRepository.findOne({
            where: { contact: { id: contact_id } },
        });
    
        return updatedLatitude;
    }
}