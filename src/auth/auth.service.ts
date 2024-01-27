import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './interface/payload.interface';
import { Response } from 'express';
import * as argon from 'argon2';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userService.findUnique({ email });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isValidPassword = await argon.verify(user.password, password);

    if (!isValidPassword) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  async setAuthToken(
    res: Response,
    payload: IPayload,
  ): Promise<{ accessToken: string }> {
    const accessToken = this.jwtService.sign(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      domain: this.configService.get('DOMAIN'),
      expires: new Date(
        Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
      ),
    });

    return {
      accessToken,
    };
  }

  async clearAuthToken(res: Response): Promise<void> {
    // Clear cookie in client
    res.clearCookie('access_token', {
      domain: this.configService.get<string>('DOMAIN'),
      httpOnly: true,
    });
  }

  async validateUser(userId: number): Promise<User> {
    return this.userService.findUnique({ id: userId });
  }
}
