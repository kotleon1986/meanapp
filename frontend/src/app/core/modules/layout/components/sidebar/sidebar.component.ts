import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public collapsed = true;
  public minimized = false;
  constructor(
    public _auth: AuthService
  ) { }

  ngOnInit() {
  }

}
