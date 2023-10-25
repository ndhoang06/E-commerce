import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  googleId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  picture: string;

  @Expose()
  role: string;

  @Expose()
  accessToken?: string;
}
