import {
  Entity,
  Column,
  CreateDateColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
@Entity({ name: 'users' })
export class User {
  constructor(props: User) {
    Object.assign(this, props);
  }
  @PrimaryColumn()
  public readonly employee_id: string;
  @Column({ name: 'login', nullable: false })
  public login: string;
  @Column({ nullable: false })
  public password: string;
  @Column({ name: 'is_active', nullable: true, default: false })
  public isActive: boolean;
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  public UpdatedAt: Date;
  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
  }
}
