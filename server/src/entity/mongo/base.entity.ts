import { Entity, Column, ObjectID, ObjectIdColumn, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

// @Entity()
export abstract class BaseEntity {

  @ObjectIdColumn({ unique: true })
  id: ObjectID;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @VersionColumn({
    default: 0
  })
  version?: number;

  @Column()
  ip: string
}