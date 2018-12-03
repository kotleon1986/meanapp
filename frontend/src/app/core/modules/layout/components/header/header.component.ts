import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    avatarUrl: string;
    constructor(
        public _auth: AuthService
    ) { }

    ngOnInit() {
        this.avatarUrl = this._auth.avatar();
        this._auth.userUpdated.subscribe(() => {
            this.avatarUrl = this._auth.avatar();
        });
    }

    logout() {
        this._auth.logout();
    }

}
