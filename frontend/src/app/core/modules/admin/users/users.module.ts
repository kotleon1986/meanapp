import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DataTableModule } from '../../shared/components/data-table/data-table.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersCreateEditComponent } from './components/users-create-edit/users-create-edit.component';
import { UsersService } from './services/users.service';
import { UserResolver } from './user.resolver';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    DataTableModule,
  ],
  declarations: [
    UsersListComponent,
    UsersCreateEditComponent
  ],
  providers: [
    UsersService,
    UserResolver
  ]
})
export class UsersModule { }
