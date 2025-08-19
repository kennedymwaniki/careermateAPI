import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello there, please proceed to /api to access the swagger documentation and if new go to users and create a new user and login';
  }
}
