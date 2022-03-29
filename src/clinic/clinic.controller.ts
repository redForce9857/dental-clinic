import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateDto } from './DTO/create.dto';
import { UpdateDto } from './DTO/update.dto';
import { Clinic } from './entity/clinic.entity';
import { Employees } from './enum/doctors.enum';
import { DoctorsStatus } from './enum/doctorsStatus.enum';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly service: ClinicService){}

    @Get()
    getAll(){
        return this.service.getAll()
    }

    @Get(':active')
    async getActiveEntries():Promise<Array<Clinic>> {
        return await this.service.getActiveEntries()
    }
    
    @Get(':first')
    getAllForOneDoctor(@Param('first') first: Employees.first):Promise<Array<Clinic>>{
        return this.service.getAllForOneDoctor(first)
    }

    @Post()
    createEntry(@Body() createDto: CreateDto){
        return this.service.createEntry(createDto);
    }

    @Patch(':id')
    // DTO update
    update( @Param('id')id: number, @Body() updatDto: UpdateDto): Promise<Clinic> {
        return this.service.update(id,updatDto)
    }
    
    @Delete(':id')
    delete( @Param('id')id: number) {
        return this.service.delete(id)
    }
    
}
