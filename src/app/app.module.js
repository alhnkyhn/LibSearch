var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { AcceptPage } from '../pages/accept/accept';
import { ApplicationDetailPage } from '../pages/application-detail/application-detail';
import { SearchPage } from '../pages/search/search';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CONFIG_OF_FIREBASE } from '../config';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map