import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { mergeMap } from "rxjs";

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AccountData } from "../account.interface";


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit{
  accountProfile!: AccountData;
  isLoading: boolean = false;
  //disableSubmit!: boolean;
  selectedRole!: string;
  selectedGender!: string;
  roles: Array<string> = ['admin', 'staff', 'operator'];
  form!: FormGroup;

  constructor(
    private ar: ActivatedRoute,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: [Validators.required, Validators.pattern('/(\d)+/')],
      email: [Validators.required, Validators.email],
      username: [Validators.required, Validators.pattern('/[a-zA-Z0-9]+/')],
      role: [Validators.required],
      avatar: [],
      gender: [Validators.required]
    });
    this.ar.paramMap.pipe(
      mergeMap(() => this.authService.getCurrentAccount())
    )
      .subscribe(account => {
        this.isLoading = false;
        this.accountProfile = account;
        this.selectedGender = this.accountProfile.gender ? this.accountProfile.gender : '';
        this.selectedRole = this.accountProfile.role ? this.accountProfile.role : '';
        this.form.setValue({
          firstname: this.accountProfile.firstname,
          lastname: this.accountProfile.lastname,
          phone: this.accountProfile.phone,
          email: this.accountProfile.email,
          username: this.accountProfile.username,
          role: this.accountProfile.role,
          avatar: this.accountProfile.avatar,
          gender: this.accountProfile.gender
        })
    })

        //this.editForm.get('title')?.patchValue(this.todo.title);
    // this.form = new FormGroup({
    //   'firstname': new FormControl(null, {validators: [Validators.required]}),
    //   'lastname': new FormControl(null, { validators: [Validators.required] }),
    //   'phone': new FormControl(null, { validators: [Validators.required, Validators.pattern('/(\d)+/')] }),
    //   'email': new FormControl(null, { validators: [Validators.required, Validators.email] }),
    //   'username': new FormControl(null, { validators: [Validators.required, Validators.pattern('/[a-zA-Z0-9]+/')]}),
    //   'role': new FormControl(null, { validators: [Validators.required]}),
    //   'avatar': new FormControl(null),
    //   'gender': new FormControl(null, {validators: [Validators.required]})
    // });

    // this.authService.getCurrentAccount()
    //   .subscribe(response => {
    //     this.isLoading = false;
    //     this.accountProfile = <AccountData>response;
    //     this.selectedGender = this.accountProfile.gender ? this.accountProfile.gender : '';
    //     this.selectedRole = this.accountProfile.role ? this.accountProfile.role : '';
    //     this.form.setValue({
    //       firstname: this.accountProfile.firstname,
    //       lastname: this.accountProfile.lastname,
    //       phone: this.accountProfile.phone,
    //       email: this.accountProfile.email,
    //       username: this.accountProfile.username,
    //       role: this.accountProfile.role,
    //       avatar: this.accountProfile.avatar,
    //       gender: this.accountProfile.gender
    //     })
    // });
  }

  onUpdateAccount() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.updateCurrentAccount({ ...this.accountProfile, ...this.form.value });
      // .subscribe(response => {
      //   //reset form: this.form.reset(); // but no need to reset
      // });
  }
}
