import { Module } from '@nestjs/common';
import { ClinicModule } from './clinic/clinic.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from 'db.config';

@Module({
  imports: [
    ClinicModule,
    TypeOrmModule.forRoot(DB_CONFIG)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


