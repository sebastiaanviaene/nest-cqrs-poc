import { IsString } from 'class-validator';
import { HelloHandler } from 'hello/handlers/hello.handler';
import { Command } from 'utils/command';

export class HelloExtendedBody extends Command<HelloHandler> {
  @IsString()
  name: string;

  @IsString()
  message: string;
}
