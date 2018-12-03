import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../modules/shared/services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  showHeader: boolean;
  routesWithoutHeader = [
    'login', 'register', 'forgot-password', 'reset-password'
  ];

  constructor(
    public _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkRouteForHeader();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.checkRouteForHeader());
  }

  checkRouteForHeader() {
    this.showHeader = !this.routesWithoutHeader.find(route => !!this.router.url.match(new RegExp(`(${route})(\/|$)`)));
  }
}
