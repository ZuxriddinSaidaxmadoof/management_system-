import { Controller, Get, Post, Body, Param, Delete, Injectable, Inject, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from './entities/user.entity';

@Injectable()
@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(@Inject("IUserservice") private readonly usersService: UsersService) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.WORKER)
  @Get()
  @ApiQuery({name: "companyId", type: Number, required: false})

  findAll(@Query() queries?: {companyId: number}, @CurrentUser() currentUser?: UserEntity) {    
    return this.usersService.findAll(queries?.companyId, currentUser);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto, Number(id));
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
