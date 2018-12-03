import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  tokenValid: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
      this.token = this.route.snapshot.params.token;
      this._auth.resetPasswordTokenCheck(this.token).subscribe(
        () => this.tokenValid = true,
        (err) => {
          if (err.message.includes('Token expired'))  {
            this.router.navigate(['forgot-password']);
          }
        }
      );
  }

  resetPassword(form: FormGroup) {
    if (form.valid) {
      this._auth.resetPassword({token: this.token, ...form.value}).subscribe((result) => {
        this.router.navigate(['login']);
      });
    }
  }

}
