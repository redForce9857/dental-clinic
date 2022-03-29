import { Employees } from "../enum/doctors.enum";


export class CreateDto{
    doctors: Employees;
    startBooking: Date;
    endBooking: Date;
}