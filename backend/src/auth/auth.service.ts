import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InvitationsService } from '../invitations/invitations.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private invitationsService: InvitationsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(googleId: string): Promise<any> {
    const user = await this.usersService.findByGoogleId(googleId);
    if (user) {
      const { googleId, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleGoogleCallback(profile: any, invitationToken?: string): Promise<any> {
    // check existing user
    let user = await this.usersService.findByGoogleId(profile.id);
    if (user) return this.login(user);

    // new user, determine role and family using invitation or default
    let role: UserRole = UserRole.MEMBER;
    let family = null;
    if (invitationToken) {
      const inv = await this.invitationsService.findByToken(invitationToken);
      if (inv) {
        role = inv.role;
        family = inv.family;
      }
    }
    user = await this.usersService.createFromGoogle(profile, role, family);
    return this.login(user);
  }
}
