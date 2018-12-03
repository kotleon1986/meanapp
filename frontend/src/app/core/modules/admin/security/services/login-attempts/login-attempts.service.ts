import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAttemptsService {

  constructor(
    private _api: ApiService
  ) { }

  get() {
    return this._api.request('admin.security.login_attempts.get');
  }

  reset(id: number | string) {
    return this._api.request('admin.security.login_attempts.reset', id);
  }

}
