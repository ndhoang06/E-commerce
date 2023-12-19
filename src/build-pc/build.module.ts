import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Build } from './entities/build.entity';
import UserEntity from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Build,UserEntity]),
  ],
  controllers: [BuildController],
  providers: [BuildService]
})
export class BuildModule {}
