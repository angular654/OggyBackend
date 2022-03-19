/* eslint-disable */
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  ConflictException,
} from "@nestjs/common";
import * as dotenv from "dotenv";
import { AuthService } from "./auth.service";
import { sign } from "jsonwebtoken";
import { LoginUserDto, LoginUserResponse } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { RegisterUserDto, RegisterUserResponse } from "./dto/register-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    const user_find = await this.authService.findUserByEmail(
      loginUserDto.email
    );
    const ispassword = bcrypt.compareSync(
      loginUserDto.password,
      user_find.password
    );
    if (ispassword === true) {
      const data: LoginUserDto = {
        email: user_find.email,
        password: user_find.password,
      };
      const user = await this.authService.findUser(data);
      if (user) {
        const token = sign(
          { _id: user.id },
          dotenv.config().parsed.USERS_SECRET,
          { expiresIn: "90d" }
        );
        await this.authService.setToken(data, token);
        return {
          token,
        };
      } else {
        throw new UnauthorizedException("Incorrect login or password");
      }
    } else {
      throw new UnauthorizedException("Invalid data");
    }
  }
  @Post('register')
  async register(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponse> {
    try {
      const user = await this.authService.createUser(createUserDto);
      const token = sign({ _id: user.id }, dotenv.config().parsed.USERS_SECRET, { expiresIn: '90d' });
      await this.authService.setToken(
        { email: user.email, password: user.password },
        token,
      );
      return {
        token,
        name: user.name,
        email: user.email
      };
    } catch (e) {
      if (e.code == 11000) {
        throw new ConflictException('Email, phone or login is already used');
      } else {
        return e;
      }
    }
  }
  @Post("logout")
  async logout(@Headers("Auth-Token") token: string) {
    await this.authService.deleteToken(token);
    return {
      status: "Logout done",
    };
  }
}
