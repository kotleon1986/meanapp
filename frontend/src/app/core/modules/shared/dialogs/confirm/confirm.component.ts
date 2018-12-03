import {Component, EventEmitter} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    title: string;
    message: string;
    onClose: EventEmitter<boolean> = new EventEmitter();

    constructor(private bsModalRef: BsModalRef) { }

    close(result: boolean) {
        this.onClose.next(result);
        this.bsModalRef.hide();
    }

}
