import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { IUserService } from '../user/interfaces/user.service';
import { LoginOrPasswordWrongException, LoginAlreadyExistException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../user/interfaces/user.repository';

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

    if (!foundUser) {
      throw new LoginOrPasswordWrongException();
    }

    if (foundUser.password !== dto.password) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (foundUser) {
      throw new LoginAlreadyExistException();
    }

    const createdUser = await this.userRepository.insert(dto);

    const token = await this.jwtService.signAsync({ id: createdUser.id});

    return new ResData<ILoginData>('success', HttpStatus.CREATED, {
      user: createdUser,
      token,
    });
  }

}
