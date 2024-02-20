import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  dbName: 'nestjs-poc',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  extensions: [Migrator],
});
