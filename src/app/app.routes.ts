import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'diary-modal',
    loadComponent: () => import('./pages/diary-modal/diary-modal.page').then( m => m.DiaryModalPage)
  },
];
