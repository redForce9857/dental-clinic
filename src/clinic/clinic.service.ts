import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './DTO/create.dto';
import { UpdateDto } from './DTO/update.dto';
import { Clinic, ClinicRepository } from './entity/clinic.entity';

@Injectable()
export class ClinicService {
    constructor(private readonly clinicRepo: ClinicRepository){}

    getAll(){
        return this.clinicRepo.find()
    }

    getAllForOneDoctor(){
       return this.clinicRepo.find()
    }

    async createEntry(createDto: CreateDto): Promise<Clinic>{
        const start = new Date(createDto.startBooking)
        const end = new Date(start.getTime()+ 3_600_000)
        console.log(start);
        console.log(end);
    
        if((start.getHours()-6 >= 12 && start.getHours()-6 <= 13)) {
            throw new BadRequestException('Обееед')
        }
        if(!(start.getHours()-6 >= 9 && start.getHours()-6 < 16)){
            throw new BadRequestException('Cлишкoм поздно для регистрации')
        }
        createDto.endBooking = end
        if (start.getDay() == 6 || start.getDay() == 0) {
            throw new BadRequestException('Mы на выходных')
        }

        const clinic = await this.clinicRepo.findOne({
            doctors: createDto.doctors,
            startBooking: start
        })

        if(clinic){
            throw new BadRequestException("доктор занят")
        }
        
        return await this.clinicRepo.save(createDto)
    }

    async update(id: number, update: UpdateDto): Promise<Clinic>{
        const entity = await this.clinicRepo.findOne({where: {id:id}})
        if(!entity){
            throw new NotFoundException();
        }
        const start = new Date(update.startBooking)
        const end = new Date(start.getTime()+ 3_600_000)
        console.log(start);
        console.log(end);
    
        if((start.getHours()-6 >= 12 && start.getHours()-6 <= 13)) {
            throw new BadRequestException('Обееед')
        }
        if(!(start.getHours()-6 >= 9 && start.getHours()-6 < 16)){
            throw new BadRequestException('Cлишкoм поздно для регистрации')
        }
        update.endBooking = end
        if (start.getDay() == 6 || start.getDay() == 0) {
            throw new BadRequestException('Mы на выходных')
        }

        const clinic = await this.clinicRepo.findOne({
            doctors: update.doctors,
            startBooking: start
        })

        if(clinic){
            throw new BadRequestException("доктор занят")
        }
        

        Object.assign(entity, update)
        return await this.clinicRepo.save(entity)
    }
    // DTO for deletion
    async delete(id: number){
        const entity = await this.clinicRepo.findOne({where: {id:id}})
        if(!entity){
            throw new NotFoundException();
        }
        return await this.clinicRepo.delete(id)
    }
    async getActive(): Promise<Clinic>{
        return
    }
}
