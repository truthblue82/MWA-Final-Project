import { Component, OnInit } from "@angular/core";

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AccountData } from "../account.interface";


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit{
  accountProfile!: AccountData;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    //
  }
}
