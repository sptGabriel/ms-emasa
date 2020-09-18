import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity({ name: 'employees' })
@Index(['matricula'], { unique: true })
export class Employee {
  constructor(props: Omit<Employee, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) this.id = uuid();
  }
  @PrimaryColumn('uuid')
  public readonly id: string;
  @Column({ name: 'matricula', nullable: false })
  public matricula: string;
  @Column({ name: 'first_name', nullable: false })
  public firstName: string;
  @Column({ name: 'last_name', nullable: false })
  public lastName: string;
  @Column()
  public departament_id: string;
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  public UpdatedAt: Date;
}
