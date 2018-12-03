import {Injectable} from '@angular/core';
import {ConfirmComponent} from '../../dialogs/confirm/confirm.component';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';


@Injectable()
export class DialogService {

    constructor(private _modal: BsModalService) { }

    confirm(title: string, message: string): Observable<any> {
        return this.open(ConfirmComponent, {
            title: title,
            message: message
        });
    }

    open(component, initialState: object): Observable<any> {
        const modalRef: BsModalRef = this._modal.show(component, {initialState});
        return modalRef.content.onClose;
    }

}
