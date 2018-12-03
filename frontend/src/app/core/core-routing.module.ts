import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth/auth.guard';
import { Roles } from './../constants/roles';
import { CoreComponent } from './component/core.component';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: CoreComponent, children: [
    { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [AuthGuard], data: {
      role: Roles.admin,
      breadcrumb: 'Admin'
    }},
    { path: '', loadChildren: './modules/main/main.module#MainModule', data: { breadcrumb: 'Home' }},
    { path: '**', component: PageNotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
