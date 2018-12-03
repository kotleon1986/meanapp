import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this._auth.sendForgotPasswordRequest(this.forgotPasswordForm.value).subscribe((result) => {
        this.router.navigate(['login']);
      });
    }
  }

}
