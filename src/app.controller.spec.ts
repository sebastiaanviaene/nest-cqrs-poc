import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'app.module';
import * as request from 'supertest';
import { initValidation } from 'utils/initSerialization';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initValidation(app);
    await app.init();
  });

  describe('root', () => {
    it('should return user', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({ firstName: 'Seba' })
        .expect(201)
        .expect({ firstName: 'Seba' });
    });
  });
});
