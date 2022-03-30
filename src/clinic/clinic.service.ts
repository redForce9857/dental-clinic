import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './DTO/create.dto';
import { UpdateDto } from './DTO/update.dto';
import { Clinic, ClinicRepository } from './entity/clinic.entity';
import { Employees } from './enum/doctors.enum';
import { DoctorsStatus } from './enum/doctorsStatus.enum';

@Injectable()
export class ClinicService {
    constructor(private readonly clinicRepo: ClinicRepository){}

    getAll(){
        return this.clinicRepo.find()
    }

    getAllForOneDoctor(workers: Employees):Promise<Array<Clinic>>{
        let g = this.clinicRepo
        .createQueryBuilder()
        .where("doctors = :h", {h: workers})
        
       return g.getMany()
    }

    async getActiveEntries(): Promise<Array<Clinic>>{
        return this.clinicRepo.createQueryBuilder().andWhere(
            "status = :b", {b: DoctorsStatus.OK}
        ).getMany()
    }

    async createEntry(createDto: CreateDto): Promise<Clinic>{
        const start = new Date(createDto.startBooking)
        const end = new Date(start.getTime()+ 3_600_000)
    
    
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
    async delete(id: number){
        const entity = await this.clinicRepo.findOne({where: {id:id}})
        if(!entity){
            throw new NotFoundException();
        }
        return await this.clinicRepo.delete(id)
    }
}
