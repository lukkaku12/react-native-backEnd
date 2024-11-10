import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LatitudeModule } from './latitude/latitude.module';
import { LongitudeModule } from './longitude/longitude.module';
import User from './users/entities/user.entity';
import Contact from './contacts/entities/contact.entity';
import Longitude from './longitude/entities/longitude.entity';
import { Latitude } from './latitude/entities/latitude.entity';

@Module({
  imports: [
  ConfigModule.forRoot({isGlobal: true}), 
  ContactsModule, UsersModule, TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [User, Contact, Latitude, Longitude],
      synchronize: true,
      ssl: {
        rejectUnauthorized:false
      }
    })
    }), LatitudeModule, LongitudeModule],
})
export class AppModule {}
