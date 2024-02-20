import { IsString } from 'class-validator';
import { CreateUserHandler } from 'user/handlers/create.user.handler';
import { Command } from 'utils/command';

export class UserBody extends Command<CreateUserHandler> {
  @IsString()
  firstName: string;
}
