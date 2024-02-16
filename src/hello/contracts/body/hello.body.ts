import { IsString } from 'class-validator';
import { HelloHandler } from 'hello/handlers/hello.handler';
import { Command } from 'utils/command';

export class HelloBody extends Command<HelloHandler> {
  @IsString()
  name: string;
}
