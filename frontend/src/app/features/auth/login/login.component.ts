import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading!: boolean;
  appTitle: string = process.env.NG_APP_TITLE;

  constructor(private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Delivery Management System - Login');

    //this.authenticationService.logout();
    const user = this.authenticationService.getCurrentUser();
    if (!user) {
      console.log('if not user')
      this.createForm();
    }
    else this.logout();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new FormGroup({
        email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        rememberMe: new FormControl(savedUserEmail !== null)
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    this.loading = true;
    this.authenticationService
      .login(email.toLowerCase(), password)
      .subscribe(response => {
        // set the state
        if (rememberMe) {
          localStorage.setItem('savedUserEmail', email);
        } else {
          localStorage.removeItem('savedUserEmail');
        }
        this.authenticationService.userState$.next(response);
        this.authenticationService.persistState();
        this.router.navigate(['/']);
      }, error => {
        this.notificationService.openSnackBar(error.error.error);
        this.loading = false;
      });
  }

  //add more
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['auth/login']);
  }

  resetPassword() {
      this.router.navigate(['auth/password-reset-request']);
  }
}
