import { Body, Controller, Post } from '@nestjs/common';
import { HelloBody } from './hello/contracts/body/hello.body';
import { BaseController } from './utils/controller.base';

@Controller()
export class AppController extends BaseController {
  @Post('/hello')
  getHello(@Body() helloBody: HelloBody) {
    const body = new HelloBody();
    body.name = 'Seba';
    return this.execute(helloBody);
  }
}