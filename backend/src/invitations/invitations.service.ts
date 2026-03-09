import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { FamiliesService } from '../families/families.service';
import { UserRole } from '../users/user.entity';
import { Family } from '../families/family.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invRepo: Repository<Invitation>,
    private familiesService: FamiliesService,
  ) {}

  async createByFamilyId(familyId: string, email: string, role: UserRole, expiresAt?: Date) {
    const family = await this.familiesService.findById(familyId);
    if (!family) throw new Error('Family not found');
    const token = Math.random().toString(36).substr(2);
    const inv = this.invRepo.create({ family, email, role, token, expiresAt });
    return this.invRepo.save(inv);
  }

  async findByToken(token: string): Promise<Invitation | undefined> {
    return this.invRepo.findOne({ where: { token }, relations: ['family'] });
  }
}
