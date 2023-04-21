import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//import leaflet
import * as L from 'leaflet';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { FormsModule } from '@angular/forms';

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
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore())
    ),
    provideRouter(routes),
  ],
});
