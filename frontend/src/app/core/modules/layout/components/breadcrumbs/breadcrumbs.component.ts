import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { BreadcrumbsService, IBreadcrumb } from 'ng6-breadcrumbs';

import StorageHelper from '../../../../../helpers/storage.helper';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [];

  constructor(
    private router: Router,
    private _breadcrumbs: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.breadcrumbs = StorageHelper.get('breadcrumbs');
    if (this.breadcrumbs) {
      this._breadcrumbs.store(this.breadcrumbs);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        const breadCrumbsSubscription = this._breadcrumbs.get().subscribe((breadcrumbs: IBreadcrumb[]) => {
          const parametrizedBreadcrumbs = breadcrumbs.filter(bc => bc.label.includes('['));
          if (parametrizedBreadcrumbs.length) {
            parametrizedBreadcrumbs.forEach(pbc => {
              const field = pbc.label.replace(/[\[\]']+/g, '').split('.');
              const data = event.snapshot.data;
              const label = data[field[0]][field[0]][field[1]];
              const targetBc = breadcrumbs.find(bc => bc.label === pbc.label);
              targetBc.label = label;
            });
          }

          this.breadcrumbs = breadcrumbs;
          StorageHelper.set('breadcrumbs', breadcrumbs);
          setTimeout(() => breadCrumbsSubscription.unsubscribe(), 100);
        });
      }
    });
  }
}
