import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {
    AuthService as SocialAuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { Roles } from '../../../../../../constants/roles';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private _social: SocialAuthService,
                private _auth: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    loginUser() {
        if (this.loginForm.valid) {
            this._auth.login(this.loginForm.value).subscribe((results) => {
                this._auth.store(results);
                if (results.user.role.name === Roles.admin) {
                    this.router.navigate(['admin']);
                } else {
                    this.router.navigate(['dashboard']);
                }
            });
        }
    }

    socialLogin(platform: string) {
        let provider = null;
        switch (platform) {
            case 'Google':
                provider = GoogleLoginProvider.PROVIDER_ID;
                break;

            case 'Facebook':
                provider = FacebookLoginProvider.PROVIDER_ID;
                break;
        }

        this._social.signIn(provider).then((userData) => {
            if (userData) {
                this._auth.socialLogin(userData).subscribe((results) => {
                    this._auth.store(results);
                    this.router.navigate(['dashboard']);
                });
            }
        });
    }

}
