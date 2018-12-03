import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from './../shared/shared.module';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';

// components
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FooterComponent} from './components/footer/footer.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        BreadcrumbsModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}
