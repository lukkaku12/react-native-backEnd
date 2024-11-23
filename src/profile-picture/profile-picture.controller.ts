import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePictureService } from './profile-picture.service';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  // Crear una imagen de perfil
  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File must be provided.');
    }
    return this.profilePictureService.createProfilePicture(file, { userId });
  }

  // Obtener una imagen de perfil
  @Get(':userId')
  async getProfilePicture(@Param('userId', ParseIntPipe) userId: number) {
    return this.profilePictureService.getProfilePicture(userId);
  }

  // Actualizar una imagen de perfil
  @Put(':userId')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePicture(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File must be provided.');
    }

    const imageUrl = await this.profilePictureService.createProfilePicture(file, { userId });
    return this.profilePictureService.updateProfilePicture(userId, imageUrl.profile_picture_uri);
  }

  // Eliminar una imagen de perfil
  @Delete(':userId')
  async deleteProfilePicture(@Param('userId', ParseIntPipe) userId: number) {
    return this.profilePictureService.deleteProfilePicture(userId);
  }
}