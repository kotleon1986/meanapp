import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {SecurityRoutingModule} from './security-routing.module';

import {LoginAttemptsComponent} from './components/login-attempts/login-attempts.component';
import {ErrorLogsComponent} from './components/error-logs/error-logs.component';

import {LoginAttemptsService} from './services/login-attempts/login-attempts.service';
import {ErrorLogsService} from './services/error-logs/error-logs.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SecurityRoutingModule
    ],
    declarations: [
        LoginAttemptsComponent,
        ErrorLogsComponent
    ],
    providers: [
        LoginAttemptsService,
        ErrorLogsService
    ]
})
export class SecurityModule {
}
