import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TypesPage } from '../pages/record-types/types-page';
import { RecordListPage } from '../pages/records/record-list-page';
import { ResumeByPeriodPage } from '../pages/resumes/resume-by-period-page';
import { ResumeByTypePage } from '../pages/resumes/resume-by-type-page';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RecordListPage;

  pages: Array<{title: string, component: any, params: object}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
        { title: 'Spese', component: RecordListPage, params: {kind: 'E'} },
        { title: 'Entrate', component: RecordListPage, params: {kind: 'I'} },
        { title: 'Riassunto Spese', component: ResumeByPeriodPage, params: {kind: 'E'} },
        { title: 'Riassunto Entrate', component: ResumeByPeriodPage, params: {kind: 'I'} },
        { title: 'Tipi di Spesa', component: TypesPage, params: {kind: 'E'} },
        { title: 'Tipi di Entrate', component: TypesPage, params: {kind: 'I'} }
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
    this.nav.setRoot(page.component, page.params);
  }
}
