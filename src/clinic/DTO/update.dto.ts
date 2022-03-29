import { Employees } from "../enum/doctors.enum";


export class UpdateDto{
    doctors: Employees;
    startBooking: Date;
    endBooking: Date;
}

