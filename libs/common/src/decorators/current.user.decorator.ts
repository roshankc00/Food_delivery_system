import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

const getCuurentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const Currentuser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCuurentUserByContext(context),
);
