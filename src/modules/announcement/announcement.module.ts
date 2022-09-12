import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';
import { OrmModule } from '../../infrastructure/orm/orm.module';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    OrmModule,
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService, ORMService],
})
export class AnnouncementModule {}
