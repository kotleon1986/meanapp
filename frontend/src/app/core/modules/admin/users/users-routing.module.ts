import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersCreateEditComponent } from './components/users-create-edit/users-create-edit.component';
import { UserResolver } from './user.resolver';

const routes: Routes = [
  {path: '', component: UsersListComponent },
  {path: 'create', component: UsersCreateEditComponent, data: { breadcrumb: 'New' } },
  {path: 'edit/:id', component: UsersCreateEditComponent, data: { breadcrumb: '[user.name]' }, resolve: { user: UserResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
