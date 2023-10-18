import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
