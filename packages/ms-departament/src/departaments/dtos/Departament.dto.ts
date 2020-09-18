import {
  IsOptional,
  IsString,
  ValidateNested,
  ValidatePromise,
  IsUUID,
  Allow,
  IsNotEmpty,
  ValidateIf,
  IsEmpty,
  NotEquals,
} from 'class-validator';
export class AddDepartament {
  constructor(data: { departament_name: string; manager_id: string }) {
    this.departament_name = data.departament_name;
    this.manager_id = data.manager_id;
  }

  @IsString({
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Departament',
      field: 'departament_name',
      reason: 'Invalid Input',
      message: `Expected string on argument`,
    },
  })
  public departament_name: string;

  @IsOptional()
  @IsUUID('4', {
    message:
      'Client specified an invalid argument. Check error message and error details for more information.',
    context: {
      resource: 'Departament',
      field: 'manager_id',
      reason: 'Invalid Input',
      message: `Expected UUID Version 4 on argument`,
    },
  })
  public manager_id: string;
}
