import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }
  async googleLogin(googleId) {
    if (!googleId) {
      return 'No User from google';
    } else {
      const user = await this.userService.createUser(googleId);
      const data = { ...googleId, userRole: user.role, _id: user._id };
      const payload = await this.createJWT(data);
      console.log(payload)
      return {
        access_token: payload,
      };
    }
  }
  createJWT(payload) {
    const data = {
      googleId: payload.googleId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      picture: payload.picture,
      email: payload.email,
      role: payload.userRole,
      _id: payload._id
    };
    return this.jwtService.sign(data);
  }
}
