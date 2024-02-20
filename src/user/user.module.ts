import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHandler } from './handlers/create.user.handler';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [CqrsModule],
  providers: [CreateUserHandler],
})
export class UserModule {}
