import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'diary-task-modal',
    loadComponent: () => import('./pages/diary-task-modal/diary-task-modal.page').then( m => m.DiaryTaskModalPage)
  },
];
