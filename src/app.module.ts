import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';

import { AppController } from './app.controller';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      tsNode: false,
    }),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
