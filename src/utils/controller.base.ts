import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from './command';

export abstract class BaseController {
  constructor(@Inject(CommandBus) public readonly bus: CommandBus) {}

  public execute<TBody extends Command<any>>(command: TBody): TBody['view'] {
    return this.bus.execute(command) as any;
  }
}
