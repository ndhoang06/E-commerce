import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  firstName: string;
  lastName: string;
  @Expose({ name: 'fullName' })
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

export class optionsUser {
  @ApiPropertyOptional()
  keyword?: string;
  @ApiPropertyOptional()
  size?: number;
  @ApiPropertyOptional()
  limit?: number;
  @ApiPropertyOptional()
  page?: number;
}
