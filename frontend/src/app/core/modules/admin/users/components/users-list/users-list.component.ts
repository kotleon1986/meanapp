import { Component, OnInit } from '@angular/core';
import { DataTableSettings } from '../../../../../../interfaces/data-table-settings';
import { DataTable } from './../../../../../../interfaces/data-table';
import { CellType } from '../../../../../../constants/cell-type';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, DataTable {

  tableSettings: DataTableSettings;
  constructor() { }

  ngOnInit() {
    this.tableSettings = {
      columns: [
        {title: 'ID#', prop: 'id' },
        {title: 'Name', sorter: 'firstName'},
        {title: 'Email'},
        {title: 'Role', prop: 'role.displayName' },
        {title: 'Status', type: CellType.BADGE},
        {title: 'Registered', prop: 'createdAt', type: CellType.DATE}
      ],
      endpoint: 'admin.users.list',
      removeEndpoint: 'admin.users.delete',
      filters: [
        { type: 'select', label: 'Role', key: 'roleId', url: 'roles', optionKey: 'displayName' },
        { type: 'range', label: 'ID', key: 'id' },
        { type: 'date', label: 'Registered', key: 'createdAt' }
      ]
    };
  }
}
