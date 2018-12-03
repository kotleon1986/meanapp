import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogsService {

  constructor(
    private _api: ApiService
  ) { }

  get() {
    return this._api.request('admin.security.error_logs.get');
  }

  reset() {
    return this._api.request('admin.security.error_logs.reset');
  }

}
