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
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: 'http://localhost:8080'
    })
    try {
      const { tokens } = await client.getToken(code);
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
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
      console.log('token', token)
      return {
        access_token: token,
        data
      };
    } catch (error) {
      throw new HttpException(
        'Google authentication failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
