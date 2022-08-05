import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Employee } from "./employee.interface";
import { AuthData } from "./authen.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlPref: string = 'http://localhost:3000/employees';

  constructor(private http: HttpClient, private router: Router) { }

  createEmployee(employee: Employee) {
    return this.http.post(`${this.urlPref}/signup`, employee)
      .subscribe(response => {
        console.log(response);
        //this.router.navigate(['/', 'employees']);
      });
  }

  login(authData: AuthData) {
    return this.http.post(`${this.urlPref}/login`, authData)
      .subscribe(response => {
        console.log(response);
    })
  }
}
