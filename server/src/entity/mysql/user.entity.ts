import { Entity, Column, Generated } from 'typeorm';
import { BaseEntity } from './base.entity';


export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost"
}

@Entity()
export class User extends BaseEntity {

  @Column({ length: 64, primary: true, unique: true, nullable: false, default: '' })
  email: string;

  @Column({ length: 64, nullable: false })
  password: string;

  @Column("text", { nullable: true })
  token: string;

  @Column({ length: 16, nullable: true })
  username: string;

  @Column({ nullable: true })
  tel: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  role: UserRole;

  @Column({ nullable: false, default: 5 })
  loginAttempts: number;

  // @Column()
  // @Generated("uuid")
  // uuid: string;
}