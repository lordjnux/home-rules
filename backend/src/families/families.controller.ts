import { Controller, Post, Body } from '@nestjs/common';
import { FamiliesService } from './families.service';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.familiesService.create(name);
  }
}
