import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { BullModule } from '@nestjs/bull';
// import { AuthConsumer } from './auth.consumer';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    // BullModule.registerQueue({
    //   name: 'registerGG',
    // }),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy,
    //  AuthConsumer
    ],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
