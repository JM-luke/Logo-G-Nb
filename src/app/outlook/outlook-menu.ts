import { NbMenuItem } from '@nebular/theme';

export const OUTLOOK_MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Outlook',
    icon: 'nb-tables',
    children: [
      {
        title: 'Mail',
        link: '/outlook/mail',
      },
      {
        title: 'Contacts',
        link: '/outlook/contacts',
      },
    ],
  },
  
];
