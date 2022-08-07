import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthData } from '../../auth/login/auth.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  authData!: AuthData;
  imgUrl: string = environment.backendUrl + '/images';

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authData = <AuthData>this.authService.getCurrentUser();
    if (!this.authData.avatar) this.authData.avatar = this.imgUrl + '/male.jpg';
  }

}
