import { Entity, Column } from "typeorm";
import { BaseEntity } from './base.entity';

export class Profile {

  @Column()
  about: string;

  @Column()
  education: string;

  @Column()
  career: string;
}

export class Photo {

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  size: number;

  constructor(url: string, description: string, size: number) {
    this.url = url;
    this.description = description;
    this.size = size;
  }
}

@Entity()
export class User extends BaseEntity {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column(type => Profile)
  profile: Profile;
  
  @Column(type => Photo)
  photos: Photo[];
}