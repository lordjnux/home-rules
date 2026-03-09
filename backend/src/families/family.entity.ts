import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Family {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // maximum number of parents and members handled in logic rather than schema
  @OneToMany(() => User, (user) => user.family)
  members: User[];
}
