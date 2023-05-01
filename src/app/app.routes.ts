import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'notepad-modal',
    loadComponent: () => import('./pages/notepad-modal/notepad-modal.page').then( m => m.NotepadModalPage)
  },

];
