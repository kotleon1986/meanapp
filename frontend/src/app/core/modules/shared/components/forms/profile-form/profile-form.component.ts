import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from './../../../validators/password-confirmation';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UploadService } from '../../../services/upload/upload.service';
import { DialogService } from './../../../services/dialog/dialog.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { User } from './../../../../../../models/user';
import { Role } from '../../../../../../models/role';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @ViewChild('avatar') avatar: any;
  @Input('user') user?: User;
  @Input('roles') roles?: Role[];

  form: FormGroup;
  photoUrl: string;
  photo: File;
  isUpdate: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public _auth: AuthService,
    private _upload: UploadService,
    private _dialog: DialogService,
    private _profile: ProfileService
  ) { }

  ngOnInit() {
    if (!this.user) {
      if (!this._auth.isAdmin()) {
        this.user = this._auth.user() || new User();
      } else {
        this.user = new User();
      }
    }

    if (this.user && this.user.avatar) {
      this.photoUrl = this._auth.avatar(this.user);
    }

    this.isUpdate = (Object.keys(this.user).length > 0);

    this.form = this.configureForm();
  }

  configureForm(): FormGroup {
    const formConfig = {
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email])
    };

    if (!this.isUpdate) {
      formConfig['password'] = new FormControl('', [Validators.required, Validators.minLength(8)]);
      formConfig['confirmPassword'] = new FormControl('', Validators.required);
    }

    if (this._auth.isAdmin() && this.roles) {
      formConfig['roleId'] = new FormControl(this.user.roleId || '', [Validators.required]);
    }

    const extra = !this.isUpdate ? {
      validator: PasswordValidation.MatchPassword
    } : null;

    return this.formBuilder.group(formConfig, extra);
  }

  register() {
    if (this.form.valid) {
      const data = this.photo ?
          this._upload.createFormData(this.photo, 'photo', this.form.value) :
          this.form.value;
      this._auth.register(data).subscribe(() => {
          if (this._auth.isAdmin()) {
            this.router.navigate(['admin/users']);
          } else {
            this.router.navigate(['login']);
          }
      });
    }
  }

  update() {
    if (this.form.valid) {
      this._profile.updateProfile(this.form.value, this.user.id).subscribe((result) => {
        this.user = result.user;
        if (!this._auth.isAdmin()) {
          this._auth.setUser(this.user);
        }
      });
    }
  }

  uploadPhoto(event) {
    if (event.target.files) {
      const files = event.target.files;
      this._upload.previewPhoto(files).subscribe((photoData: any) => {
        this.photoUrl = photoData.img;
        if (Object.keys(this.user).length) {
          this._dialog.confirm('Change Photo', 'Are you sure you wish to change your photo?').subscribe((confirmed: boolean) => {
            if (confirmed) {
                const data = this._upload.createFormData(photoData.file, 'photo');
                this._profile.changePhoto(data, this.user.id).subscribe((results) => {
                  if (!this._auth.isAdmin()) {
                    this.user.avatar = results.avatar;
                    this._auth.setUser(this.user);
                  }
                });
            } else {
                this.photoUrl = this._auth.avatar(this.user);
            }
          });
        } else {
          this.photo = photoData.file;
        }
      });
    }
  }

  clearPhoto() {
    this.photoUrl = '';
    this.photo = null;
    this.avatar.nativeElement.value = '';
  }

  removePhoto() {
    this._dialog.confirm('Remove photo', 'Are you sure you wish to remove this photo?').subscribe((confirmed: boolean) => {
        if (confirmed) {
            this._profile.removePhoto(this.user.id).subscribe(() => {
                this.photoUrl = '';
                this.user.avatar = '';
                if (!this._auth.isAdmin()) {
                  this._auth.setUser(this.user);
                }
            });
        }
    });
  }

}
