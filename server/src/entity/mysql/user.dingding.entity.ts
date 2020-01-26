import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost"
}

@Entity()
export class UserDing extends BaseEntity {
  
  @Column({ length: 64, primary: true, unique: true, nullable: false, default: '' })
  email: string;

  @Column("text", { nullable: true })
  token: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  role: UserRole;

  @Column({ length: 64, unique: true })
  dingid: string;

  @Column()
  workcode: string;

  @Column()
  name: string;

  @Column()
  department_id: string;

  @Column()
  department_ids: string;

  @Column()
  all_dept_ids: string;

  @Column()
  department: string;

  @Column()
  departments: string;

  @Column()
  avatar: string;

  @Column()
  position: string;
}