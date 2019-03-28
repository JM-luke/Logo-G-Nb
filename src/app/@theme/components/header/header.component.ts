import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
// import { UserService } from '../../../@core/data/users.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
// import { from } from 'rxjs';
// import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: {};

  userMenu = [{ title: 'Profile', link: ['/users/me'] }, { title: 'Log out', link: ['/auth/logout'] }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              // private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        this.user = token.getPayload();
        console.log('user: '+JSON.stringify(this.user));
      }
    });
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
