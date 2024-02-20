import { Entity, Property } from '@mikro-orm/core';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class User {
  @Property({ primary: true })
  @IsNumber()
  id!: number;

  @Property()
  @IsString()
  firstName: string;
}
