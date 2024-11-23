import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from 'src/s3/s3.service';
import User from 'src/users/entities/user.entity'; // Entidad User
import Contact from 'src/contacts/entities/contact.entity';

@Injectable()
export class ProfilePictureService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>, // Repositorio de TypeORM
    private readonly s3Service: S3Service,
  ) {}

  // Subir una imagen de perfil
  async uploadProfilePicture(data: { imageUrl: string; userId: number }) {
    const { imageUrl, userId } = data;

    // Verifica que el usuario exista en la base de datos
    const existingUser = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    // Actualiza la URL de la imagen de perfil en el usuario
    existingUser.profile_picture_uri = imageUrl;
    return this.userRepository.save(existingUser);
  }

  // Obtener una imagen de perfil
  async getProfilePicture(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['profile_picture_uri'], // Solo seleccionamos la URL de la imagen
    });

    if (!user || !user.profile_picture_uri) {
      throw new NotFoundException('Profile picture not found for this user.');
    }

    // Generar URL firmada si la imagen de perfil existe
    try {
      const signedUrl = await this.s3Service.generatePresignedUrlFromBaseUrl(
        user.profile_picture_uri,
        3600, // URL válida por 1 hora
      );
      return signedUrl;
    } catch (error) {
      throw new NotFoundException('Error generating signed URL');
    }
  }

  // Actualizar la imagen de perfil
  async updateProfilePicture(userId: number, imageUrl: string) {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.profile_picture_uri = imageUrl;
    return this.userRepository.save(user);
  }

  // Eliminar la imagen de perfil
  async deleteProfilePicture(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
      select: ['name', 'profile_picture_uri'],
    });

    if (!user || !user.profile_picture_uri) {
      throw new NotFoundException('User or profile picture not found.');
    }

    const key = `${user.name}-Profile-picture`; // Clave del archivo en S3
    await this.s3Service.deleteImage(key).catch((error) => {
      console.error('Error deleting image from S3:', error);
      throw new InternalServerErrorException('Error deleting the image from S3.');
    });

    user.profile_picture_uri = null; // Elimina la referencia de la imagen en la base de datos
    return this.userRepository.save(user);
  }

  // Crear una imagen de perfil
  async createProfilePicture(file: Express.Multer.File, body: { userId: number }) {
    try {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only image files are allowed!');
      }

      // Verifica que el usuario exista y obtén los nombres
      const user = await this.userRepository.findOne({
        where: { id: +body.userId },
        select: ['id', 'name'], // Selecciona los campos necesarios
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      // Incluye los nombres en el mensaje de procesamiento (si es necesario)
      console.log(`Uploading profile picture for ${user.name}`);

      // Subir la imagen a S3 con el nombre del usuario
      const imageUrl = await this.s3Service.uploadImage(file, `${user.name}`);

      if (!imageUrl) {
        throw new InternalServerErrorException('Error uploading image to S3.');
      }

      // Guardar la URL de la imagen en la base de datos
      return this.uploadProfilePicture({
        imageUrl,
        userId: body.userId,
      });
    } catch (error) {
      console.error('Error creating profile picture:', error);
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }
}