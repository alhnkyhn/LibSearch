import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SignupPage } from '../pages/signup/signup';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AdminPage } from '../pages/admin/admin';
import { AddBookPage } from '../pages/add-book/add-book';
import { AddBook2Page } from '../pages/add-book2/add-book2';
import { AddCityPage } from '../pages/add-city/add-city';
import { AddLibraryPage } from '../pages/add-library/add-library';
import { LibraryPage } from '../pages/library/library';
import { ApplicationPage } from '../pages/application/application';
import { AcceptPage} from '../pages/accept/accept';
import { ApplicationDetailPage } from '../pages/application-detail/application-detail';
import { SearchPage } from '../pages/search/search';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule , AngularFireDatabase} from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CONFIG_OF_FIREBASE } from '../config';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    AdminPage,
    AddBookPage,
    AddBook2Page,
    AddCityPage,
    AddLibraryPage,
    IntroPage,
    LibraryPage,
    ApplicationPage,
    ApplicationDetailPage,
    AcceptPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(CONFIG_OF_FIREBASE)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    AdminPage,
    AddBookPage,
    AddBook2Page,
    AddCityPage,
    AddLibraryPage,
    IntroPage,
    LibraryPage,
    ApplicationPage,
    ApplicationDetailPage,
    AcceptPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
