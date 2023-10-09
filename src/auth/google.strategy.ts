import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// import { InjectQueue } from '@nestjs/bull';
// import { Queue } from 'bull';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    // @Inject(UsersService) private userService: UsersService,
    // @InjectQueue('registerGG')
    // private readonly queue: Queue,
  ) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      googleId: profile.id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    done(null, user);
    // await this.queue.add(
    //   'loginGG',
    //   {
    //     to: newUser.email,
    //     name: newUser.firstName + newUser.lastName,
    //   },
    //   {
    //     removeOnComplete: true,
    //   },
    // );
  }
}
//
