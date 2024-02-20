import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';

import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      tsNode: false,
    }),
    UserModule,
  ],
})
export class AppModule {}
