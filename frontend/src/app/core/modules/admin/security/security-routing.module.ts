import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAttemptsComponent } from './components/login-attempts/login-attempts.component';
import { ErrorLogsComponent } from './components/error-logs/error-logs.component';

const routes: Routes = [
    { path: '', redirectTo: '/admin/security/login-attempts', pathMatch: 'full' },
    { path: 'login-attempts', component: LoginAttemptsComponent, data: { breadcrumb: 'Login Attempts' } },
    { path: 'error-logs', component: ErrorLogsComponent, data: { breadcrumb: 'Error Logs' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
