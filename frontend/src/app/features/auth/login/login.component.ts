import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthData } from './auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading!: boolean;

  constructor(private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Delivery Management System - Login');
    this.authenticationService.logout();
    this.createForm();
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

  resetPassword() {
      this.router.navigate(['/password-reset-request']);
  }
}