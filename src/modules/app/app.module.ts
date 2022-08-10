import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersEntity } from '../../infrastructure/orm/entities/users.entity';
import { OrmModule } from '../../infrastructure/orm/orm.module';
import { ORMService } from '../../infrastructure/orm/orm.service'
import { AnnouncementController } from '../announcement/announcement.controller'
import { AnnouncementService } from '../announcement/announcement.service'
import { AnnouncementModule } from '../announcement/announcement.module'
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
  controllers: [AppController, AnnouncementController],
  providers: [AppService, AnnouncementService, ORMService],
})
export class AppModule {}
