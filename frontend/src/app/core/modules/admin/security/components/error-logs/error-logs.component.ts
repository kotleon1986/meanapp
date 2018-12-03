import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from '../../../../shared/services/dialog/dialog.service';
import { ErrorLogsService } from '../../services/error-logs/error-logs.service';
import { Log } from '../../../../../../interfaces/log';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-logs',
  templateUrl: './error-logs.component.html',
  styleUrls: ['./error-logs.component.scss']
})
export class ErrorLogsComponent implements OnInit, OnDestroy {

  loading = true;
  subscription: Subscription;
  dialogSubscription: Subscription;
  totalLogs: Log[];
  logs: Log[] = [];
  pages: number;
  page = 0;
  next = false;

  constructor(
    private _errorLogs: ErrorLogsService,
    private _dialog: DialogService
  ) { }

  ngOnInit() {
    this.subscription = this._errorLogs.get().subscribe((result) => {
      this.loading = false;
      this.totalLogs = result.logs;
      this.pages = Math.ceil(this.totalLogs.length / 10);
      if (this.pages > 1) {
        this.logs = this.totalLogs.slice(0, 10);
        this.page = 1;
        this.next = true;
      } else {
        this.logs = this.totalLogs;
      }
    });
  }

  nextPage() {
    const logs = this.totalLogs.slice((10 * this.page), (10 * this.page) + 10);
    this.logs = [...this.logs, ...logs];
    this.page++;
    this.next = !(this.page === this.pages);
  }

  clearLogs() {
    this.dialogSubscription = this._dialog.confirm('Attention!', 'Are you sure you wish to clear all logs').subscribe((confirmed) => {
      if (confirmed) {
        this._errorLogs.reset().subscribe(() => this.logs = []);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

}
