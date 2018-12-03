import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MessageService} from '../message/message.service';
import {ApiService} from '../api/api.service';
import {User} from '../../../../../models/user';
import {Roles} from '../../../../../constants/roles';
import {Observable, Subject} from 'rxjs';
import StorageHelper from '../../../../../helpers/storage.helper';

interface LoginData {
    token: string;
    user: User;
}


@Injectable()
export class AuthService {

    public userUpdated: Subject<User> = new Subject();

    constructor(
        private _api: ApiService,
        private _message: MessageService,
        private router: Router
    ) { }

    public isAuthenticated(): boolean {
        const helper = new JwtHelperService();
        const token = this.token();
        const authenticated = token ? !helper.isTokenExpired(token) : false;

        if (!authenticated) {
            if (this.user()) {
                this._message.show('error', 'Token expired. Please login to proceed.');
                this.logout();
            }
        }

        return authenticated;
    }

    isAdmin() {
        const user = this.user();
        return (user && user.role.name === Roles.admin);
    }

    login(data: object): Observable<any> {
        return this._api.request('auth.login', data);
    }

    register(data: object): Observable<any> {
        const endpoint = this.isAdmin() ? 'admin.users.create' : 'auth.register';
        return this._api.request(endpoint, data);
    }

    refreshToken(): Observable<any> {
        return this._api.request('auth.token');
    }

    sendForgotPasswordRequest(data: object): Observable<any> {
        return this._api.request('auth.password.forgot', data);
    }

    resetPasswordTokenCheck(token: string): Observable<any> {
        return this._api.request('auth.password.check', {token: token});
    }

    resetPassword(data: object): Observable<any> {
        return this._api.request('auth.password.reset', data);
    }

    socialLogin(userData: object) {
        return this._api.request(`auth.social.login`, userData);
    }

    user(): User {
        return StorageHelper.get('user');
    }

    avatar(user?): string {
        user = user || this.user();
        return (user && user.avatar) ? user.avatar : `assets/images/no-photo.jpg`;
    }

    token(): string {
        return StorageHelper.get('token');
    }

    store(data: LoginData): void {
        this.setToken(data.token);
        this.setUser(data.user);
    }

    setToken(token: string): void {
        StorageHelper.set('token', token);
    }

    setUser(user: User): void {
        StorageHelper.set('user', user);
        if (!this.isAdmin()) {
            this.userUpdated.next(user);
        }
    }

    logout(): void {
        this.router.navigate(['login']);
        StorageHelper.clearUser();
    }

}
