import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/users/schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole: UserRole = request.user?.role; 
    return userRole === UserRole.ADMIN;
  }
}
