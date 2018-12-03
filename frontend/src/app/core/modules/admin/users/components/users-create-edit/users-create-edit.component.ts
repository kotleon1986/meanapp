import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../../../models/user';
import { Role } from '../../../../../../models/role';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-create-edit',
  templateUrl: './users-create-edit.component.html',
  styleUrls: ['./users-create-edit.component.scss']
})
export class UsersCreateEditComponent implements OnInit {

  loading = true;
  user: User;
  roles: Role[];


  constructor(
    private _user: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this._user.getRoles().subscribe((results) => {
      this.roles = results.roles;
      if (this.router.url.split('/').pop() !== 'create') {
        this.route.data.subscribe((result) => {
          this.user = result.user.user;
        });
      }
    });
  }

  changeUserStatus(status: boolean) {
    this._user.changeStatus(this.user.id, Number(status)).subscribe();
  }

  changeUserPassword(passwordForm: FormGroup) {
    if (passwordForm.valid) {
      this._user.changePassword(this.user.id, passwordForm.value.password).subscribe();
      passwordForm.reset();
    }
  }

  resetPassword() {
    this._user.resetPassword(this.user.id).subscribe();
  }

}
