import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { HelloHandler } from 'hello/handlers/hello.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [AppService, HelloHandler],
})
export class AppModule {}
