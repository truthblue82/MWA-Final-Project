import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { mergeMap } from "rxjs";

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from "src/app/core/services/notification.service";
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { AccountData } from "src/app/models/account";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit{
  accountProfile!: AccountData;
  selectedRole!: string;
  selectedGender!: string;
  roles: Array<string> = ['admin', 'staff', 'operator'];
  genders: Array<string> = ['Male', 'Female'];
  form!: FormGroup;
  imagePreview!: string;
  requiredImgType: Array<string> = ['.jpg', '.png', '.jpeg'];
  //uploadProgress!: number;

  constructor(
    private ar: ActivatedRoute,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    public spinnerService: SpinnerService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.buildAccountFrom();

    this.ar.paramMap.pipe(
      mergeMap(() => this.authService.getCurrentAccount())
    )
    .subscribe(account => {
      this.accountProfile = account;
      this.setRolesByAccount(account.role);
      this.selectedGender = this.accountProfile.gender ? this.accountProfile.gender : '';
      this.selectedRole = this.accountProfile.role ? this.accountProfile.role : '';
      this.setFormValue(account);
    })
  }

  private buildAccountFrom() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.pattern('^[0-9]{10}$')],
      email: ['',Validators.email],
      username: ['', Validators.pattern('^[a-zA-Z0-9]{6,}$')],
      role: ['',Validators.required],
      avatar: [''],
      file: [''],
      gender: ['',Validators.required]
    });
  }

  private setFormValue(data: AccountData) {
    this.form.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        username: data.username,
        role: data.role,
        avatar: data.avatar,
        file: '',
        gender: data.gender
      });
  }

  private setRolesByAccount(role: string) {
    switch (role) {
      case 'staff':
        this.roles = ['staff', 'operator']
        break;
      case 'operator':
        this.roles = ['operator'];
        break;
      default:
        break;
    }
  }

  onUpdateAccount() {
    if (this.form.invalid) {
      return;
    }
    this.authService.updateCurrentAccount({ ...this.accountProfile, ...this.form.value })
      .subscribe(response => {
        this.accountProfile = response;
        this.notificationService.openSnackBar('Update successful');
        //this.router.navigate(['account/profile']);
        //reset form: this.form.reset(); // but no need to reset
      }, error => {
        this.notificationService.openSnackBar(error.error.error);
      });
  }

  setPropertyFormValue(propName: string, newValue: string) {
    this.form.get(propName)?.patchValue(newValue);
  }

  onImagePicker(event: Event) {
    const element = (event.target as HTMLInputElement);
    const files = element.files ? element.files[0] : null;
    this.form.get('file')?.patchValue(files);
    this.form.get('avatar')?.patchValue(files?.name);
    this.form.get('file')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(files as File);
  }
}
