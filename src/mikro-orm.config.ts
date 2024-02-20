import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  dbName: 'nestjs-poc',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
});
