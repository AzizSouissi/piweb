import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/common/decorators/public.decorator';
import { PermissionsGuard } from 'src/auth/common/guards/permissions.guard';
import { RegisterRequest } from './dtos/RegisterRequest.dto';

@Controller('users')
export class UsersController {
    constructor(private  usersService: UsersService) {}

   //@UseGuards(PermissionsGuard)
   // @SetMetadata('authorities', ['ADD::ROLE'])
   // @UseGuards(PermissionsGuard)
   //@SetMetadata('authorities', ['READ::USER'])
    @Get()
    getUsers(){
        return this.usersService.getUsers()
    }
    
   
    @Get('UserPrivilegesByEmail/:email')
    getUserPrivilegesByEmail(@Param('email') email : string)
    {
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
    addUser(@Body() registerRequest : RegisterRequest)
    {
      return this.usersService.addUser(registerRequest);

    }

    @Delete(':id')
    deteteUser(@Param('id') id : string){
        return this.usersService.deteteUser(id);
    }

  }

