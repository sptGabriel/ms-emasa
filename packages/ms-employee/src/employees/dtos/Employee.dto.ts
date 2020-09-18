import { IsOptional, IsString, IsUUID } from 'class-validator';

export interface IEmployeeDTO {
  matricula: string;
  first_name: string;
  last_name: string;
  login: string;
  password: string;
  departament_id: string;
}
export interface IEmployeeWithoutUser {
  matricula: string;
  first_name: string;
  last_name: string;
  departament_id: string;
}

// export interface IEmployeeDTO extends IEmployeeWithUser, IEmployeeWithoutUser {}

export class AddEmployee {
  constructor(data: IEmployeeDTO) {
    this.matricula = data.matricula;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.login = data.login;
    this.password = data.password;
    this.departament_id = data.departament_id;
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
  public matricula: string;

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
  public first_name: string;

  @IsString({
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Create Employee',
      field: 'last_name',
      reason: 'Invalid Input',
      message: `Expected string on argument`,
    },
  })
  public last_name: string;

  @IsOptional()
  @IsString({
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Create Employee',
      field: 'login',
      reason: 'Invalid Input',
      message: `Expected string on argument`,
    },
  })
  public login?: string;

  @IsOptional()
  @IsString({
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Create Employee',
      field: 'password',
      reason: 'Invalid Input',
      message: `Expected string on argument`,
    },
  })
  public password?: string;

  @IsUUID('4', {
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Create Employee',
      field: 'departament_id',
      reason: 'Invalid Input',
      message: `Expected UUID Version 4 on argument`,
    },
  })
  public departament_id: string;
}
