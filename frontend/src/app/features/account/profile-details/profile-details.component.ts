import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthData } from '../../auth/login/auth.interface';
import { environment } from 'src/environments/environment';
import { AccountData } from '../account.interface';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  accountProfile!: AccountData;
  imgUrl: string = environment.backendUrl;
  fullname!: string;
  mailTo!: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    //10KG
    //this.authData = <AuthData>this.authService.getCurrentUser();
    this.authService.getCurrentAccount().subscribe(account => {
      this.accountProfile = account;
      let defaultImg = `/images/${account.gender}.jpg`;
      if (!account.avatar) account.avatar = this.imgUrl + defaultImg;
      else account.avatar = this.imgUrl + account.avatar;
      this.fullname = `${account.firstname} ${account.lastname}`;
      this.mailTo = 'mailTo:' + account.email;
    })
  }

}
