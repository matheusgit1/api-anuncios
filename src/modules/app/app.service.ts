import { Injectable } from '@nestjs/common';
import { ORMService } from '../../infrastructure/orm/orm.service';
@Injectable()
export class AppService {
  constructor(private readonly ormService: ORMService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
