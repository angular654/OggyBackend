export class RegisterUserDto {
  name: string;
  telephone?: number;
  email: string;
  password: string;
}

export class RegisterUserResponse {
  token: string;
  name: string;
  email: string;
}
