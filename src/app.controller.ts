import { Body, Controller, Post } from '@nestjs/common';
import { HelloBody } from './hello/contracts/body/hello.body';
import { BaseController } from './utils/controller.base';

@Controller()
export class AppController extends BaseController {
  @Post('/hello')
  getHello(@Body() helloBody: HelloBody) {
    return this.execute(helloBody);
  }
}
