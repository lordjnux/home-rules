import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './family.entity';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private famRepo: Repository<Family>,
  ) {}

  async create(name: string): Promise<Family> {
    const fam = this.famRepo.create({ name });
    return this.famRepo.save(fam);
  }

  async findById(id: string): Promise<Family | undefined> {
    return this.famRepo.findOne({ where: { id }, relations: ['members'] });
  }
}
