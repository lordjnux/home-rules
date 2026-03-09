import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Family } from '../families/family.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { googleId }, relations: ['family'] });
  }

  async createFromGoogle(profile: any, role: UserRole, family?: Family): Promise<User> {
    const user = this.usersRepo.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      role,
      family,
    });
    return this.usersRepo.save(user);
  }

  async assignFamily(user: User, family: Family) {
    user.family = family;
    return this.usersRepo.save(user);
  }
}
