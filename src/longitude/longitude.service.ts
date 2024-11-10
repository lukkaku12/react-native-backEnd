import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Longitude from './entities/longitude.entity';
import { CreateLongitudeDto } from './dto/create-longitude.dto';
import { UpdateLongitudeDto } from './dto/update-longitude.dto';
import Contact from 'src/contacts/entities/contact.entity';

@Injectable()
export class LongitudeService {
    constructor(
        @InjectRepository(Longitude)
        private readonly longitudeRepository: Repository<Longitude>,
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) {}

    async createLongitude(createLongitudeDto: CreateLongitudeDto): Promise<Longitude> {
        const { longitude, contact_id } = createLongitudeDto;

        // Buscamos el Contacto utilizando el contact_id
        const contact = await this.contactRepository.findOneBy({ id: contact_id });
        if (!contact) {
            throw new NotFoundException(`Contacto no encontrado para el ID: ${contact_id}`);
        }

        // Creamos una nueva instancia de Longitude
        const newLongitude = this.longitudeRepository.create({
            longitude,
            contact, // Asociamos el contacto encontrado
        });

        // Guardamos la nueva entidad Longitude en la base de datos
        return await this.longitudeRepository.save(newLongitude);
    }

    async findLongitudeByContactId(contactId: number): Promise<Longitude> {
        const longitude = await this.longitudeRepository.findOne({ where: { contact: { id: contactId } } });
        if (!longitude) {
            throw new NotFoundException(`Longitud no encontrada para el ID de contacto: ${contactId}`);
        }
        return longitude;
    }

    async updateLongitude(contact_id: number, updateLongitudeDto: UpdateLongitudeDto): Promise<Longitude> {
        const { longitude } = updateLongitudeDto;
    
        // Buscar el contacto usando el contact_id proporcionado
        const contact = await this.contactRepository.findOneBy({ id: contact_id });
        if (!contact) {
            throw new NotFoundException(`Contacto no encontrado para el ID: ${contact_id}`);
        }
    
        // Buscar la longitud asociada a ese contacto
        const longitudeEntity = await this.longitudeRepository.findOne({
            where: { contact: { id: contact_id } },
        });
    
        if (!longitudeEntity) {
            throw new NotFoundException(`Longitud no encontrada para el contacto con ID: ${contact_id}`);
        }
    
        // Actualizar los datos de longitud
        longitudeEntity.longitude = longitude;
    
        // Guardar la longitud actualizada en la base de datos
        return this.longitudeRepository.save(longitudeEntity);
    }

    async findContactLongitude(id: number): Promise<Longitude> {
        if (isNaN(id)) {
            throw new InternalServerErrorException(`El ID proporcionado no es válido: ${id}`);
        }

        try {
            const longitude = await this.longitudeRepository.findOne({
                where: { contact: { id } },
            });

            if (!longitude) {
                throw new NotFoundException(`Longitud no encontrada para el ID de contacto: ${id}`);
            }

            return longitude;
        } catch (error) {
            console.error('Error al buscar la longitud:', error);
            throw new InternalServerErrorException('Error al buscar la longitud');
        }
    }
}