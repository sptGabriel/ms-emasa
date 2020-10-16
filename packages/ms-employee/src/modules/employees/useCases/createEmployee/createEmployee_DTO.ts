import { EnumEmployeePostions } from '@modules/employees/domain/employee';

export interface createEmployeeDTO {
  matricula: string;
  first_name: string;
  last_name: string;
  departament_id: string;
  position: EnumEmployeePostions;
}
