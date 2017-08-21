import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TypesPage } from '../pages/types/types';
import { ExpensesPage } from '../pages/expenses/expenses';
import { ResumePage } from '../pages/resume/resume';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ExpensesPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
        { title: 'Spese', component: ExpensesPage },
        { title: 'Riassunto', component: ResumePage },
        { title: 'Tipi di Spesa', component: TypesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.login();
    });
  }

  // Anonymous login to firebase.
  // In Firebase Console, the database access rules have been set as:
  // "rules": {
  //  ".read": "auth != null",
  //  ".write": "auth != null"
  // }
  // and the Anonymous authentication method has been enabled in the Authentication console
  login() {
    this.afAuth.auth.signInAnonymously()
    .then(auth => {
      // Do custom things with auth
    })
    .catch(err => {
      // Handle error
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 1000
      });
      toast.present();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
