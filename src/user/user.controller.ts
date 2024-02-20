import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from 'utils/controller.base';
import { UserBody, UserView } from './contracts';

@Controller('users')
export class UserController extends BaseController {
  @Post()
  createUser(@Body() userBody: UserBody): Promise<UserView> {
    return this.execute(userBody);
  }
}
