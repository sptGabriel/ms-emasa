import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';
@Entity({ name: 'departaments' })
export class Departament {
  constructor(props: Omit<Departament, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) this.id = uuid();
  }
  @PrimaryColumn()
  public readonly id: string;
  @Column()
  public departament_name: string;
  @Column({ type: 'string', name: 'manager_id', nullable: true })
  public manager_id: string | null;
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
