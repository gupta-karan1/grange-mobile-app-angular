import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['tabs/login']); //if not logged in, redirect to login page
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
        path: 'map-full',
        loadComponent: () =>
          import('../map-full/map-full.page').then((m) => m.MapFullPage),
      },

      {
        path: 'tab1-details/:moduleNo',
        loadComponent: () =>
          import('../tab1-details/tab1-details.page').then(
            (m) => m.Tab1DetailsPage
          ),
      },
      {
        path: 'map',
        loadComponent: () => import('../map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
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
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
