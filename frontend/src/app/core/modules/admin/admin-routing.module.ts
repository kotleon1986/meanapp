import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
  { path: 'users', loadChildren: './users/users.module#UsersModule', data: { breadcrumb: 'Users' } },
  { path: 'security', loadChildren: './security/security.module#SecurityModule', data: { breadcrumb: 'Security' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
