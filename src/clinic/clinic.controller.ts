import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateDto } from './DTO/create.dto';
import { UpdateDto } from './DTO/update.dto';
import { Clinic } from './entity/clinic.entity';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly service: ClinicService){}

    @Get()
    getAll(){
        return this.service.getAll()
    }
    
    @Get(':/firstDoctor')
    getAllForOneDoctor(){
        return this.service.getAllForOneDoctor()
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
