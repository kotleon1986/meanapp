import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { RedirectGuard } from './../shared/guards/redirect/redirect.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { Roles } from '../../../constants/roles';

const routes: Routes = [
  { path: '', loadChildren: './auth/auth.module#AuthModule', canActivate: [RedirectGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: Roles.user, breadcrumb: 'Dashboard' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { role: Roles.user, breadcrumb: 'Profile' } },
  { path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: {
      role: Roles.user,
      breadcrumb: 'Change Password'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
