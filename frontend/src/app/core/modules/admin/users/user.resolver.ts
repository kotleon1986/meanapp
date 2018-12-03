import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';
import { UsersService } from './services/users.service';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {
  constructor(
      private _users: UsersService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._users.get(route.params.id);
  }
}
