import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AdminPage } from '../pages/admin/admin';
import { AddBookPage } from '../pages/add-book/add-book';
import { AddBook2Page } from '../pages/add-book2/add-book2';
import { AddLibraryPage } from '../pages/add-library/add-library';
import { AddCityPage } from '../pages/add-city/add-city';
import { LibraryPage } from '../pages/library/library';
import { AcceptPage} from '../pages/accept/accept';
import { ApplicationPage } from '../pages/application/application';
import { SearchPage } from '../pages/search/search';
import { ApplicationDetailPage } from '../pages/application-detail/application-detail';

import { timer } from 'rxjs/observable/timer'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;

  showSplash = true;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
    ) {

    this.initializeApp();
  }

 initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }
}