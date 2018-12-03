import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, SimpleChanges } from '@angular/core';
import { NgxDateRangePickerOptions, NgxDateRangePickerOutput } from '@kiwigrid/ngx-daterangepicker';
import { Filter } from '../../../../../../interfaces/filter';
import { ApiService } from './../../../services/api/api.service';
import { Subscription } from 'rxjs';
import StorageHelper from '../../../../../../helpers/storage.helper';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.scss']
})
export class DataTableFilterComponent implements OnInit, OnDestroy {

  @ViewChild('range_start') rangeStart: any;
  @ViewChild('range_end') rangeEnd: any;

  @Input('filter') filter: Filter;
  @Output() filterParamEvent: EventEmitter<object> = new EventEmitter();
  options: any[];
  subscription: Subscription;
  currentValue: any;
  dateRangeValue: NgxDateRangePickerOutput;
  dateRangePickerOptions: NgxDateRangePickerOptions;

  constructor(
    private _api: ApiService
  ) { }

  ngOnInit() {
    if (this.filter.type === 'date') {
      this.dateRangePickerOptions = {
        theme: 'default',
        range: 'TM',
        dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        presetNames: [
        'This Week',
        'Last 7 Days',
        'Last Week',
        'This Month',
        'Last Month',
        'This Year',
        'Last Year',
        'Start',
        'End',
        'Apply',
        'Cancel'
        ],
        dateFormat: 'yMd',
        startOfWeek: 1,
        position: 'right'
      };

      this.dateRangeValue = {
        from: 0,
        to: 0
      };
    }
  }

  loadOptions(event): void {
    const sessionOpts = StorageHelper.sessionGet(this.filter.key);
    if (sessionOpts) {
      this.options = sessionOpts;
    } else if (event) {
      const url = `admin.${this.filter.url}`;
      this.subscription = this._api.request(url).subscribe((result) => {
        this.options = result[this.filter.dataKey || this.filter.url];
        StorageHelper.sessionSet(this.filter.key, this.options);
      });
    }
  }

  filterBySelect(value): void {
    this.currentValue = value;
    this.triggerParamEvent(value);
  }

  filterByRange(): void {
    const start = this.rangeStart.nativeElement.value;
    const end = this.rangeEnd.nativeElement.value;
    if ((start && end) && (Number(start) < Number(end))) {
      return this.triggerParamEvent(`${start}:${end}`);
    }
  }

  resetRange(): void {
    this.rangeStart.nativeElement.value = '';
    this.rangeEnd.nativeElement.value = '';
    return this.triggerParamEvent('');
  }

  dateRangeChange() {
    const from = moment(this.dateRangeValue.from).format('YYYY-MM-DD');
    const to = moment(this.dateRangeValue.to).format('YYYY-MM-DD');
    return this.triggerParamEvent(`${from}:${to}`);
  }

  triggerParamEvent(value?: string | number): void {
    const filterParam = {};
    filterParam[this.filter.key] = value || '';
    return this.filterParamEvent.next(filterParam);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
