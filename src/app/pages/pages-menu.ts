import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'nb-e-commerce',
    data: {
      permission: 'view',
      resource: 'E-commerce'
    },
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'nb-home',
    data: {
      permission: 'view',
      resource: 'IoT Dashboard'
    },
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Extra Components',
    icon: 'nb-star',
    data: {
      permission: 'view',
      resource: 'extra-components'
    },
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Stepper',
        link: '/pages/extra-components/stepper',
      },
      {
        title: 'List',
        link: '/pages/extra-components/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/extra-components/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/extra-components/accordion',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Tree',
        link: '/pages/extra-components/tree',
      },
      {
        title: 'Tabs',
        link: '/pages/extra-components/tabs',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    data: {
      permission: 'view',
      resource: 'forms'
    },
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    data: {
      permission: 'view',
      resource: 'ui-features'
    },
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    data: {
      permission: 'view',
      resource: 'modal'
    },
    icon: 'nb-layout-default',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Bootstrap',
    data: {
      permission: 'view',
      resource: 'bootstrap'
    },
    icon: 'nb-gear',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/bootstrap/inputs',
      },
      {
        title: 'Buttons',
        link: '/pages/bootstrap/buttons',
      },
      {
        title: 'Modal',
        link: '/pages/bootstrap/modal',
      },
    ],
  },
  {
    title: 'Maps',
    data: {
      permission: 'view',
      resource: 'maps'
    },
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    data: {
      permission: 'view',
      resource: 'charts'
    },
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    data: {
      permission: 'view',
      resource: 'editors'
    },
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    data: {
      permission: 'view',
      resource: 'tables'
    },
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    data: {
      permission: 'view',
      resource: 'miscellaneous'
    },
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Admin',
    icon: 'nb-tables',
    data: {
      permission: 'view',
      resource: 'admin',
    },
    children: [
      {
        title: 'Users',
        link: '/admin/users',
      },
    ],
  },
  {
    title: 'Outlook',
    icon: 'nb-tables',
    data: {
      permission: 'view',
      resource: 'admin',
    },
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
  {
    title: 'Auth',
    icon: 'nb-locked',
    data: {
      permission: 'view',
      resource: 'auth',
    },
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
