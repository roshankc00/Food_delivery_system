import { AuthGuard } from '@nestjs/passport';

export class JwtLocalGuard extends AuthGuard('local') {}
