import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _api: ApiService
  ) { }

  get(id: number | string) {
    return this._api.request('admin.users.show', id);
  }

  getRoles() {
    return this._api.request('admin.roles');
  }

  changeStatus(userId: number | string, status: number) {
    return this._api.request('admin.users.status', {
      id: userId,
      status: status
    });
  }

  changePassword(userId: number | string, password: string) {
    return this._api.request('admin.users.password.change', userId, {password: password});
  }

  resetPassword(userId: number | string) {
    return this._api.request('admin.users.password.reset', userId);
  }

}
