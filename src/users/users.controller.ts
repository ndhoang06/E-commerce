import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRole } from './user.schema';
import { ApiTags } from '@nestjs/swagger';
import { UserDto, optionsUser } from './dtos/user.dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Query() optionsUser?:optionsUser) {
    const [data, totalCount] = await this.usersService.findAll(optionsUser)
    const totalPages = Math.ceil(totalCount / (optionsUser.size ?? 10));
    return {
      data,
      totalPages,
      totalCount,
    }
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('set-role/:id')
  async setRole(@Param('id') id:string,@Req() req) {
    const user = await this.usersService.findById(id)
    return this.usersService.setRole(id,req.body.role)
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
