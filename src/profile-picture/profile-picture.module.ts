import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import User from 'src/users/entities/user.entity';
import { S3Service } from 'src/s3/s3.service';
import Contact from 'src/contacts/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  controllers: [ProfilePictureController],
  providers: [ProfilePictureService, S3Service],
  exports: [ProfilePictureService],
})
export class ProfilePictureModule {}