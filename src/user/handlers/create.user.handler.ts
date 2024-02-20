import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserBody } from '../contracts/body/user.body';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from 'entities/user.entity';

@CommandHandler(UserBody)
export class CreateUserHandler implements ICommandHandler<UserBody> {
  constructor(private em: EntityManager) {}

  async execute(command: UserBody): Promise<User> {
    const user = this.em.create(User, command);
    await this.em.persistAndFlush(user);
    return user;
  }
}
