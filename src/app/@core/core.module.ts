import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { RoleProvider } from './role.provider';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
//import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';
import { environment } from '../../environments/environment';
const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

// export class NbSimpleRoleProvider extends NbRoleProvider {
//   getRole() {
//     // here you could provide any role based on any auth flow
//     return observableOf('guest');
//   }
// }

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      // NbDummyAuthStrategy.setup({
      //   name: 'email',
      //   delay: 3000,
      // }),
      NbPasswordAuthStrategy.setup({
        name: 'pass',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: `${environment.baseUrl}/auth`,
        login: {
          endpoint: '/signin',
          method: 'post',
        },
        register: {
          endpoint: '/signup',
          method: 'post',
        },
        logout: {
          endpoint: '/signout',
          method: 'delete',
        },
        requestPass: {
          endpoint: '/forgot',
          method: 'post',
        },
        resetPass: {
          endpoint: '/reset',
          method: 'post',

        },
      }),
    ],
    forms: {
      login: {
        redirectDelay: 50, // delay before redirect after a successful login,
                            // while success message is shown to the user
        strategy: 'pass',  // strategy id key.
        rememberMe: true,   // whether to show or not the `rememberMe` checkbox
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
        socialLinks: socialLinks, // social links at the bottom of a page
      },
      register: {
        redirectDelay: 50,
        strategy: 'pass',
        showMessages: {
          success: true,
          error: true,
        },
        terms: true,
        socialLinks: socialLinks,
      },
      logout: {
        redirectDelay: 500,
        strategy: 'pass',
      },
      requestPassword: {
        redirectDelay: 500,
        strategy: 'pass'
      },
      resetPassword: {
        strategy: 'pass',
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        //view: '',
      },
      user: {
        //parent: 'guest',
        view: ['panel','extra-components', 'auth'],
      },
      controller: {
        parent: 'user',
        view: ['*'],
        edit: '*',
      },
      admin: {
        parent: 'controller',
        view: ['*'],
        remove: '*',
      }
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
