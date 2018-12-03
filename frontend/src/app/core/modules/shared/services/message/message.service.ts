import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MessageService {

    constructor(private _toastr: ToastrService) { }

    show(type, message, position?): void {
        const options = {
            timeOut: 3000,
            escapeHtml: true
        };

        if (position) {
            options['positionClass'] = position;
        }

        this._toastr[type](message, '', options);
    }

}
