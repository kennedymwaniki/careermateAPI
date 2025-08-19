import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface Experience {
  companyName: string;
  title: string;
  startYear: number;
  endYear: number;
  duration: string;
}

export interface Education {
  degree: 'Diploma' | 'Bachelor' | 'Master' | 'PhD';
  institution: string;
  coursename: string;
  startYear: number;
  endYear: number;
}

export enum AvailabilityEnum {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  FREELANCE = 'freelance',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  fullname: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  skills: string[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  experience: Experience[];

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: AvailabilityEnum,
    nullable: true,
  })
  availability: AvailabilityEnum;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  education: Education[];

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
