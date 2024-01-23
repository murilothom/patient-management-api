import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MulterModule.register({
      dest: './upload',
    }),
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
