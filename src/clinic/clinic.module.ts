import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicRepository } from './entity/clinic.entity';
import {ClinicController} from './clinic.controller';
import {ClinicService} from './clinic.service';

 
@Module({
    imports: [TypeOrmModule.forFeature([ClinicRepository])],
    controllers: [ClinicController],
    providers: [ClinicService]
})
export class ClinicModule {}
