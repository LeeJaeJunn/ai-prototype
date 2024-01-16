import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMain(): string {
    return 'Main';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
