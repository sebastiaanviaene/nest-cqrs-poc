import { IsString } from 'class-validator';

export class UserView {
  @IsString()
  firstName: string;
}
