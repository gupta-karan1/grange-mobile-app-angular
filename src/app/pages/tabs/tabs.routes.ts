import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
        path: 'my-profile',
        loadComponent: () =>
          import('../my-profile/my-profile.page').then((m) => m.MyProfilePage),
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
