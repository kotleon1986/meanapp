import { Component, OnInit, OnDestroy, Input, Output, ViewEncapsulation, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../../services/api/api.service';
import { ExcelService } from '../../services/excel/excel.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { DataTableSettings } from '../../../../../interfaces/data-table-settings';
import { DataTablesResponse } from './../../../../../interfaces/data-table-response';
import { DataTableParams } from './../../../../../interfaces/data-table-params';
import { Column } from './../../../../../interfaces/column';
import { CellType } from '../../../../../constants/cell-type';
import { Subject, Subscription } from 'rxjs';
import StringHelper from '../../../../../helpers/string.helper';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @Input() settings: DataTableSettings;
  @Output() customButtonClickEvent?: EventEmitter<any> = new EventEmitter();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  removeSubscription: Subscription;
  exportSubscription: Subscription;
  triggerRenderSubscription: Subscription;

  loading: boolean;
  exporting: boolean;
  showFilters = false;
  cellType = CellType;
  params: DataTableParams;

  filters: object = {};
  rows: any[];
  addUrl: string;

  constructor(
    private _api: ApiService,
    private _dialog: DialogService,
    private _excel: ExcelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: false,
      searchDelay: 600,
      autoWidth: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.loading = true;
        this.setupRequestParams(dataTablesParameters);
        this._api.request(this.settings.endpoint, this.params).subscribe((response: DataTablesResponse) => {
            this.loading = false;
            this.rows = this.settings.callback ? this.settings.callback(response.rows) : response.rows;

            callback({
              recordsTotal: response.count,
              recordsFiltered: response.filtered,
              data: []
            });
        });
      },
      columns: [...this.settings.columns, {data: 'id'}]
    };

    if (!this.settings.disableAddButton) {
      this.addUrl = `${this.router.url}/create`;
    }

    if (this.settings.triggerRender) {
      this.triggerRenderSubscription = this.settings.triggerRender.subscribe(() => this.rerender());
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  setupRequestParams(dataTablesParameters): void {
    const orderColumn = this.settings.columns[dataTablesParameters.order[0].column];
    const orderBy = orderColumn.sorter || (orderColumn.prop || StringHelper.camelCase(orderColumn.title));
    const params: DataTableParams = {
      page: dataTablesParameters.start || 1,
      size: dataTablesParameters.length,
      order: orderBy,
      dir: dataTablesParameters.order[0].dir
    };

    if (dataTablesParameters.search.value.length) {
      params.search = dataTablesParameters.search.value;
    } else if (this.params) {
      delete this.params['search'];
    }

    this.params = {...this.params, ...params};
  }

  setupCustomFilterParams(param) {
    const key = Object.keys(param)[0];
    if (param[key].length > 0) {
      this.params = {...this.params, ...param};
    } else {
      delete this.params[key];
    }

    this.rerender();
  }

  edit(row: any): void {
    if (!this.settings.disableRowClick) {
      this.router.navigate([`${this.router.url}/edit/${row.id}`]);
    }
  }

  remove(row: any): void {
    if (this.settings.removeEndpoint) {
      const message = 'Are you sure you wish delete this user?';
      this.removeSubscription = this._dialog.confirm('Attention!', message).subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._api.request(this.settings.removeEndpoint, row.id).subscribe(() => this.rerender());
        }
      });
    }
  }

  exportData() {
    this.exporting = true;
    this.exportSubscription = this._api.request(this.settings.endpoint, {...this.params, export: 1}).subscribe((result) => {
      this._excel.exportData(result, this.settings.columns, `Users list`);
      this.exporting = false;
    });
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => dtInstance.draw());
  }

  customActionClickEvent(column: Column, row: any): void {
    if (column.type === this.cellType.BUTTON) {
      this.customButtonClickEvent.next(row);
    }
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();

    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }

    if (this.exportSubscription) {
      this.exportSubscription.unsubscribe();
    }

    if (this.triggerRenderSubscription) {
      this.triggerRenderSubscription.unsubscribe();
    }
  }

}
