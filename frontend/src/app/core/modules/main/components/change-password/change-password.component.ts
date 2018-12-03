import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../../../shared/services/profile/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private _profile: ProfileService
  ) { }

  ngOnInit() { }

  submit(form: FormGroup) {
    if (form.valid) {
      this._profile.changePassword(form.value).subscribe();
    }
  }
}
