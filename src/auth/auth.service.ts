import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import UserEntity from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async verifyGoogleToken(code: string) {
    const client = new OAuth2Client({
      clientId: "768841587784-rdupa4jrh74ocmn8m9ghn9ct88etjv62.apps.googleusercontent.com",
      clientSecret: "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",
      redirectUri: 'http://localhost:8080'
    })
    // try {
      const { tokens } = await client.getToken(code);
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: "768841587784-rdupa4jrh74ocmn8m9ghn9ct88etjv62.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const insertData = new UserEntity()
      insertData.firstName = payload.family_name;
      insertData.lastName = payload.given_name;
      insertData.picture = payload.picture;
      insertData.email = payload.email;

      const user = await this.userService.createUser(insertData);
      const data = { ...payload, userRole: user.role, id: user.id };
      const token = await this.createJWT(data);
      return {
        access_token: token,
        data
      };
    // } catch (error) {
    //   throw new HttpException(
    //     'Google authentication failed.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  createJWT(payload) {
    const data = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      picture: payload.picture,
      email: payload.email,
      role: payload.userRole,
      id: payload.id
    };
    return this.jwtService.sign(data);
  }
}
