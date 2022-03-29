import { Column, Entity, EntityRepository, PrimaryGeneratedColumn, Repository } from "typeorm";
import { Employees } from "../enum/doctors.enum";
import { DoctorsStatus } from "../enum/doctorsStatus.enum";

@Entity({name: 'clinic'})
export class Clinic{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doctors: Employees

    @Column()
    status: DoctorsStatus

    @Column()
    startBooking: Date;

    @Column({nullable:true})
    endBooking: Date;
}

@EntityRepository(Clinic)
export class ClinicRepository extends Repository<Clinic>{}