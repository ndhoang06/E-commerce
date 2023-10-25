import { Expose } from 'class-transformer';

export class UserDto {
  firstName: string;
  lastName: string;
  @Expose({ name: 'fullName' })
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
