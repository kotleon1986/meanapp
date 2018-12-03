import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {DataTableModule} from './components/data-table/data-table.module';
import {UiSwitchModule} from 'ngx-toggle-switch';

const modules = [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UiSwitchModule,
    DataTableModule
];

/****** services ******/
import {InterceptorService} from './services/interceptor/interceptor.service';
import {ApiService} from './services/api/api.service';
import {AuthService} from './services/auth/auth.service';
import {MessageService} from './services/message/message.service';
import {DialogService} from './services/dialog/dialog.service';
import {UploadService} from './services/upload/upload.service';
import {ProfileService} from './services/profile/profile.service';
import {ExcelService} from './services/excel/excel.service';

const services = [
    ApiService,
    AuthService,
    MessageService,
    DialogService,
    UploadService,
    InterceptorService,
    ProfileService,
    ExcelService
];


/****** guards ******/
import {AuthGuard} from './guards/auth/auth.guard';
import {RedirectGuard} from './guards/redirect/redirect.guard';
const guards = [
    AuthGuard,
    RedirectGuard
];


/****** components ******/
// dialogs
import {ConfirmComponent} from './dialogs/confirm/confirm.component';

// forms
import {ProfileFormComponent} from './components/forms/profile-form/profile-form.component';
import {PasswordFormComponent} from './components/forms/password-form/password-form.component';

// elements
import {SubmitButtonComponent} from './components/elements/submit-button/submit-button.component';
import {BackButtonComponent} from './components/elements/back-button/back-button.component';

// components
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const components = [
    ConfirmComponent,
    ProfileFormComponent,
    PasswordFormComponent,
    SubmitButtonComponent,
    BackButtonComponent,
    PageNotFoundComponent
];


/****** entry components ******/
const entryComponents = [
    ConfirmComponent
];


/****** pipes/directives ******/
import {CapitalizePipe} from './pipes/capitalize/capitalize.pipe';
const pipesAndDirectives = [
    CapitalizePipe
];


@NgModule({
    imports: [...modules],
    declarations: [...components, ...pipesAndDirectives, BackButtonComponent],
    entryComponents: [...entryComponents],
    exports: [...components, ...pipesAndDirectives, ...modules],
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [...services, ...guards]
        };
    }

    static forChild() {
        return {
            ngModule: SharedModule
        };
    }
}
