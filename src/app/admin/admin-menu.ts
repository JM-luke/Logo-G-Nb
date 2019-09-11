import { NbMenuItem } from '@nebular/theme';

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Admin',
    icon: 'nb-tables',
    children: [
      {
        title: 'Users',
        link: '/admin/users',
      },
      {
        title: 'User',
        link: '/admin/user',
      },
    ],
  },
  
];
