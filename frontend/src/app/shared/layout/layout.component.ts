import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
//import { timer, Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { environment } from 'src/environments/environment';
import { AuthData } from 'src/app/features/auth/login/auth.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  authData!: AuthData;
  imgUrl: string = environment.backendUrl + '/images';
  isAdmin: boolean = false;
  appTitle: string = environment.appTitle;

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
    this.authData = <AuthData>this.authService.getCurrentUser();

    this.isAdmin = this.authData?.role === 'admin' ? true: false;
    let defaultImg = `/${this.authData?.gender}.jpg`;
    if (!this.authData?.avatar) this.authData.avatar = this.imgUrl + defaultImg;

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
