import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Family } from '../families/family.entity';
import { UserRole } from '../users/user.entity';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  token: string;

  @ManyToOne(() => Family, { eager: true })
  family: Family;

  @Column()
  email: string;

  // store role as plain text for sqlite
  @Column({ type: 'text' })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  expiresAt: Date;
}
