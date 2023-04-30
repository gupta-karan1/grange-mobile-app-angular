import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

import { AuthGuard } from '../../guards/auth.guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/tabs/login']); //if not logged in, redirect to login page
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs/tab4']); //if logged in, redirect to tabs page

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab1-details/:moduleNo',
        loadComponent: () =>
          import('../tab1-details/tab1-details.page').then(
            (m) => m.Tab1DetailsPage
          ),
      },

      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },

      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../login/login.page').then((m) => m.LoginPage),
        ...canActivate(redirectLoggedInToHome),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },

      {
        path: 'map-full',
        loadComponent: () =>
          import('../map-full/map-full.page').then((m) => m.MapFullPage),
      },
      {
        path: 'map',
        loadComponent: () => import('../map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'add-student',
        loadComponent: () =>
          import('../add-student/add-student.page').then(
            (m) => m.AddStudentPage
          ),
      },
      {
        path: 'update-student/:studentID',
        loadComponent: () =>
          import('../update-student/update-student.page').then(
            (m) => m.UpdateStudentPage
          ),
      },
      {
        path: 'diary',
        loadComponent: () =>
          import('../diary/diary.page').then((m) => m.DiaryPage),
      },
      {
        path: 'diary-modal',
        loadComponent: () =>
          import('../diary-modal/diary-modal.page').then(
            (m) => m.DiaryModalPage
          ),
      },
      {
        path: 'diary-task-modal',
        loadComponent: () =>
          import('../diary-task-modal/diary-task-modal.page').then(
            (m) => m.DiaryTaskModalPage
          ),
      },
      {
        path: 'cal-modal',
        loadComponent: () =>
          import('../cal-modal/cal-modal.page').then((m) => m.CalModalPage),
      },
      {
        path: 'cal-update-modal',
        loadComponent: () =>
          import('../cal-update-modal/cal-update-modal.page').then(
            (m) => m.CalUpdateModalPage
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('../list/list.page').then((m) => m.ListPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'list-login',
        loadComponent: () =>
          import('../list-login/list-login.page').then((m) => m.ListLoginPage),
      },

      {
        path: 'notifications',
        loadComponent: () =>
          import('../notifications/notifications.page').then(
            (m) => m.NotificationsPage
          ),
      },
    ],
  },

  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
