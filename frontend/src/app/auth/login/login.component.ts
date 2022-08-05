import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) return;
    this.authService.login({ username: form.value.username, password: form.value.password });
  }
}
