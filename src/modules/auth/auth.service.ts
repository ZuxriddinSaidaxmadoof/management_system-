import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginOrPasswordWrongException, LoginAlreadyExistException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../users/interfaces/user.service';
import { IUserRepository } from '../users/interfaces/user.repository';
import { BcryptHashing } from 'src/lib/bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );
console.log("user", foundUser);

    const checkPassword = await BcryptHashing.compare(dto.password, foundUser.password) 
console.log("check", checkPassword);

    if (!checkPassword) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {
    
    // dto.password = await BcryptHashing.hash(dto.password);

    const {data: createdUser} = await this.userService.create(dto);


    const token = await this.jwtService.signAsync({ id: createdUser.id});

    return new ResData<ILoginData>('success', HttpStatus.CREATED, {
      user: createdUser,
      token,
    });
  }

}
