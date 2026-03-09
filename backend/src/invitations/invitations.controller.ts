import { Controller, Post, Body } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { UserRole } from '../users/user.entity';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  // create invitation by parents
  @Post()
  async create(
    @Body('familyId') familyId: string,
    @Body('email') email: string,
    @Body('role') role: UserRole,
  ) {
    return this.invitationsService.createByFamilyId(familyId, email, role);
  }
}
