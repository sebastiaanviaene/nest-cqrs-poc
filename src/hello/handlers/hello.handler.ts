import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HelloBody } from '../contracts/body/hello.body';

@CommandHandler(HelloBody)
export class HelloHandler implements ICommandHandler<HelloBody> {
  async execute(command: HelloBody): Promise<string> {
    return `Hello, ${command.name}!`;
  }
}
