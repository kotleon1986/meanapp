import {Component, OnInit} from '@angular/core';
import {DataTableSettings} from '../../../../../../interfaces/data-table-settings';
import {LoginAttemptsService} from '../../services/login-attempts/login-attempts.service';
import {CellType} from '../../../../../../constants/cell-type';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-login-attempts',
    templateUrl: './login-attempts.component.html',
    styleUrls: ['./login-attempts.component.scss']
})
export class LoginAttemptsComponent implements OnInit {

    tableSettings: DataTableSettings;
    triggerRender: Subject<null> = new Subject();

    constructor(
        private _loginAttempts: LoginAttemptsService
    ) { }

    ngOnInit() {
        this.tableSettings = {
            columns: [
                { title: 'ID#', prop: 'id' },
                { title: 'IP Address', prop: 'ip' },
                { title: 'Email' },
                { title: 'Attempts' },
                { title: 'Last Attempt', prop: 'updatedAt', type: CellType.DATE },
                { title: 'Reset', type: CellType.BUTTON, custom: '<i class="icon-reload icons"></i>' }
            ],
            endpoint: 'admin.security.login_attempts.get',
            disableActions: true,
            disableAddButton: true,
            disableRowClick: true,
            triggerRender: this.triggerRender
        };
    }

    resetLoginAttempts(row: any) {
        this._loginAttempts.reset(row.id).subscribe(() => {
            this.triggerRender.next();
        });
    }

}
