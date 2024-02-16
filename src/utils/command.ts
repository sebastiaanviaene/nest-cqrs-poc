import { ICommandHandler } from '@nestjs/cqrs';

export class Command<THandler extends ICommandHandler<any, any>> {
  /**
   * Only used in order to extract the return value
   * @ignore
   * @private
   */
  readonly view?: ReturnType<THandler['execute']>;
}
