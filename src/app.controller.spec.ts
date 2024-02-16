import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'app.module';
import * as request from 'supertest';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      await request(app.getHttpServer())
        .post('/hello')
        .send({ name: 'Seba' })
        .expect(201)
        .expect('Hello, Seba!');
    });
  });
});
