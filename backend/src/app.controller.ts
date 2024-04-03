import { AppService } from './app.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('api/docs')
  @Render('swagger')
  root() {
    return { title: 'Swagger' };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
