import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/common/decorators/public.decorator';
import { PermissionsGuard } from 'src/auth/common/guards/permissions.guard';
import { RegisterRequest } from './dtos/RegisterRequest.dto';
import { Observable } from 'rxjs';
import { Userprofile } from './dtos/userprofile';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //@UseGuards(PermissionsGuard)
  // @SetMetadata('authorities', ['ADD::ROLE'])
  // @UseGuards(PermissionsGuard)
  //@SetMetadata('authorities', ['READ::USER'])
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('UserPrivilegesByEmail/:email')
  getUserPrivilegesByEmail(@Param('email') email: string) {
    return this.usersService.getUserAndPrivileges(email);
  }

  @Post('assignRoleToUser')
  async assignRole(@Body() body: { userId: string; roleId: string }) {
    try {
      await this.usersService.assignRoleToUser(body.userId, body.roleId);
      return { success: true, message: 'Role assigned to user successfully' };
    } catch (error) {
      console.error('Error assigning role to user:', error);
      throw error;
    }
  }

  //@UseGuards(PermissionsGuard)
  //@SetMetadata('authorities', ['ADD::USER'])
  @Post()
  addUser(@Body() registerRequest: RegisterRequest) {
    console.log(registerRequest);
    return this.usersService.addUser(registerRequest);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<Userprofile> {
    return this.usersService.getUserByEmail(email);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  deteteUser(@Param('id') id: string) {
    return this.usersService.deteteUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: any) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }
}
