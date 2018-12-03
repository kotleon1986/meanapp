import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from './../../../validators/password-confirmation';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../../../../models/user';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  @Input() user?: User;
  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _auth: AuthService,
  ) { }

  ngOnInit() {
    const formConfig = {
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    };

    this.user = this.user || this._auth.user();

    if (this.user && !this._auth.isAdmin()) {
      formConfig['oldPassword'] = new FormControl('', Validators.required);
    }

    this.form = this.formBuilder.group(formConfig, {
      validator: PasswordValidation.MatchPassword
    });
  }

}
