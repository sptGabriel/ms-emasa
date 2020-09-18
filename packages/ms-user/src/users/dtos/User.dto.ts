import { IsString } from 'class-validator';

export interface IUser {
  login: string;
  password: string;
}

export class UserDTO {
  constructor(data: IUser) {
    this.login = data.login;
    this.password = data.password;
  }

  @IsString({
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Create Employee',
      field: 'matricula',
      reason: 'Invalid Input',
      message: `Expected string on argument`,
    },
  })
  public login: string;

  @IsString({
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Create Employee',
      field: 'first_name',
      reason: 'Invalid Input',
      message: `Expected string on argument`,
    },
  })
  public password: string;
}
