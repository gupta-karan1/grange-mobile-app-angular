import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//firebase imports for angular fire for authentication, firestore and storage
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

//import leaflet
import * as L from 'leaflet';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { FormsModule } from '@angular/forms';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarService } from './app/services/avatar.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
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
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideAuth(() => getAuth())
    ),
    provideRouter(routes),
  ],
});

//to use the pwa elements in the app
defineCustomElements(window);
