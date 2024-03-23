import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from './entities/auth.entity';

const getCuurentUserByContext = (context: ExecutionContext): UserEntity => {
  return context.switchToHttp().getRequest().user;
};

export const Currentuser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCuurentUserByContext(context),
);
