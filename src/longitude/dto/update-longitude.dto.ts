import { PartialType } from '@nestjs/mapped-types';
import { CreateLongitudeDto } from './create-longitude.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLongitudeDto extends PartialType(CreateLongitudeDto) {
    @IsNumber()
    @IsOptional()
    id?:number;
}
