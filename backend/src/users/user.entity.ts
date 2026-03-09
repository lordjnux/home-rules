import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Family } from '../families/family.entity';

export enum UserRole {
  PARENT = 'parent',
  MEMBER = 'member',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  googleId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  // sqlite doesn't support enum type directly; store as text
  @Column({ type: 'text' })
  role: UserRole;

  @ManyToOne(() => Family, (family) => family.members, { nullable: true })
  family: Family;
}
