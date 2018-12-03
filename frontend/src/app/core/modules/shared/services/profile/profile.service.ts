import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _api: ApiService,
    private _auth: AuthService
  ) { }

  updateProfile(data: object, userId?: number | string): Observable<any> {
    const endpoint = this._auth.isAdmin() ? 'admin.users.update' : 'profile.update';
    return this._api.request(endpoint, userId, data);
}

  changePhoto(data: object, userId?: number | string): Observable<any> {
    const endpoint = this._auth.isAdmin() ? 'admin.users.photo.change' : 'profile.photo.change';
    return this._api.request(endpoint, userId, data);
  }

  removePhoto(userId?: number | string): Observable<any> {
    const endpoint = this._auth.isAdmin() ? 'admin.users.photo.remove' : 'profile.photo.remove';
    return this._api.request(endpoint, userId);
  }

  changePassword(data: object, userId?: number | string): Observable<any> {
    const endpoint = this._auth.isAdmin() ? 'admin.users.password.reset' : 'profile.password.change';
    return this._api.request(endpoint, data);
  }

}
