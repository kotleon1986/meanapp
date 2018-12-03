import { Injectable } from '@angular/core';
import { MessageService } from './../message/message.service';
import { Observable, throwError, Subject } from 'rxjs';
import { ApiResponse, ErrorResponse } from '../../../../../interfaces/response';
import { Router } from '@angular/router';
import StorageHelper from '../../../../../helpers/storage.helper';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  public requestCompleteSubject: Subject<null> = new Subject();

  constructor(
    private _message: MessageService,
    private router: Router
  ) { }

  responseHandler(response: ApiResponse): object {
    this.requestCompleteSubject.next();
    if (response.success && response.message) {
      this._message.show('success', response.message);
    }

    if (response.token) {
      StorageHelper.set('token', response.token);
    }

    return response.data;
  }

  errorHandler(response: ErrorResponse): Observable<any> {
    console.log(response);
    this.requestCompleteSubject.next();
    const data = response.error;
    if (!data.success && data.message) {
        if (typeof data.message === 'string') {
            this._message.show('error', data.message);
        } else {
            let messages = '';
            Object.entries(data.message).forEach(
                ([field, message]) => messages += `* ${message} \r\n`
            );
            this._message.show('error', messages, 'toast-top-center');
        }
    }

    if (response.status === 401) {
      StorageHelper.clearUser();
      this.router.navigate(['login']);
    }

    return throwError(data);
  }

}
