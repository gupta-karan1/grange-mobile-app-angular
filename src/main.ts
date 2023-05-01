import { ChartEvent } from 'chart.js';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterLink, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//firebase imports for angular fire for authentication, firestore and storage
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  provideAuth,
} from '@angular/fire/auth';

//import leaflet
import * as L from 'leaflet';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { FormsModule } from '@angular/forms';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarService } from './app/services/avatar.service';
import { AuthGuard } from './app/guards/auth.guard';
import { QuillModule, QuillModules } from 'ngx-quill';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';

//quill modules for the toolbar
//for customizing the toolbar, see https://quilljs.com/docs/modules/toolbar/

const modules: QuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    // [{ direction: 'rtl' }], // text direction
    // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean'], // remove formatting button

    ['link', 'image', 'video'], // link and image, video
  ],
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({}),
      HttpClient,
      HttpClientModule,
      NgModule,
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AvatarService,
      GoogleAuthProvider,
      FacebookAuthProvider,
      RouterLink,
      TwitterAuthProvider,
      AuthGuard,

      QuillModule.forRoot({
        modules,
        placeholder: 'Compose an epic...',
        theme: 'snow',
        format: 'object',
      }),

      NgChartsModule.forRoot(),
      BaseChartDirective,

      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideAuth(() => getAuth()),
      AuthGuard
    ),
    provideRouter(routes),
  ],
});

//to use the pwa elements in the app
defineCustomElements(window);
