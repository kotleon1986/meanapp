import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxDateRangePickerModule } from '@kiwigrid/ngx-daterangepicker';

import { DataTableComponent } from './data-table.component';
import { DataTableFilterComponent } from './data-table-filter/data-table-filter.component';
import { DataTableCellComponent } from './data-table-cell/data-table-cell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataTablesModule,
    NgxDateRangePickerModule
  ],
  declarations: [
    DataTableComponent,
    DataTableFilterComponent,
    DataTableCellComponent
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
