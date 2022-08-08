import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
//import { timer, Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { environment } from 'src/environments/environment';
//import { AuthData } from 'src/app/features/auth/login/auth.interface';
import { AccountData } from 'src/app/features/account/account.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  //authData!: AuthData;
  accountProfile!: AccountData;
  imgUrl: string = environment.backendUrl;
  isAdmin: boolean = false;
  appTitle: string = environment.appTitle;
  fullname!: string;

  //private autoLogoutSubscription: Subscription = new Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: AuthenticationService,
    private authGuard: AuthGuard) {

    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //10KG
    //this.authData = <AuthData>this.authService.getCurrentUser();
    this.authService.getCurrentAccount().subscribe(account => {
      this.accountProfile = account;
      let defaultImg = `/images/${account.gender}.jpg`;
      if (!account.avatar) account.avatar = this.imgUrl + defaultImg;
      else account.avatar = this.imgUrl + account.avatar;
      this.fullname = `${account.firstname} ${account.lastname}`;
      this.isAdmin = this.accountProfile?.role === 'admin' ? true : false;
    });

    // Auto log-out subscription
    // const timer$ = timer(2000, 5000);
    // this.autoLogoutSubscription = timer$.subscribe(() => {
    //     this.authGuard.canActivate();
    // });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    //this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
