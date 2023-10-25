import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRole } from './user.schema';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    return user
  }

  // @UseGuards(AuthMiddleware)
  // @Put(':id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() credentials: AdminProfileDto
  // ) {
  //   return this.usersService.adminUpdate(id, credentials);
  // }
}
