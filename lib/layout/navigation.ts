import type { NavigationItem } from '~/lib/layout/types'

export const getNavigationItems = (
  t: (key: string) => string
  // isAdmin: boolean
): NavigationItem[][] => [
  [
    {
      label: t('layout.navigation.home'),
      icon: 'i-heroicons-home',
      to: PAGE_URL.HOME,
    },
    {
      label: 'Page 1',
      to: PAGE_URL.PAGE1,
    },
    {
      label: 'Page 2',
      to: PAGE_URL.PAGE2,
    },
  ],
]
//   isAdmin
//     ? [
//         {
//           label: t('layout.pages.users.value'),
//           icon: 'users',
//           to: PAGE_URL.USERS,
//         },
//       ]
//     : [],
