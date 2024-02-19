import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HelloBody } from 'hello/contracts/body/hello.body';
import { HelloExtendedBody } from 'hello/contracts/body/hello.extended.body';

@CommandHandler(HelloBody)
export class HelloHandler implements ICommandHandler<HelloBody> {
  async execute(command: HelloBody): Promise<HelloExtendedBody> {
    const extendedBody = new HelloExtendedBody();
    extendedBody.name = command.name;
    extendedBody.message = `Hello ${command.name}`;
    return extendedBody;
  }
}
