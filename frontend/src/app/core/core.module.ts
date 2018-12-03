import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';

import { CoreComponent } from './component/core.component';

import { environment } from './../../environments/environment';
import token from '../helpers/token';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    SharedModule.forRoot(),
    JwtModule.forRoot({
      config: {
          tokenGetter: token,
          whitelistedDomains: [environment.domain]
      }
    }),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BreadcrumbsModule,
    LayoutModule
  ],
  declarations: [CoreComponent]
})
export class CoreModule { }
