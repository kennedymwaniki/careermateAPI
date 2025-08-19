import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  filepath: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploaded_at: Date;

  @Column({
    nullable: true,
  })
  fileurl: string;

  @ManyToOne(() => User, (user) => user.resumes)
  @JoinColumn()
  user: User;
}
