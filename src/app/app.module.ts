import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { TypesPage } from '../pages/record-types/types-page';
import { RecordListPage } from '../pages/records/record-list-page';
import { RecordPage } from '../pages/records/record-page';
import { ResumePage } from '../pages/resumes/resume-page';
import { ResumeListPage } from '../pages/resumes/resume-list-page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
 
// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyBL4sl3R3JUy92uARxSt0-yek1bha4ogVo",
    authDomain: "expenses-743fd.firebaseapp.com",
    databaseURL: "https://expenses-743fd.firebaseio.com",
    projectId: "expenses-743fd",
    storageBucket: "expenses-743fd.appspot.com",
    messagingSenderId: "780330921940"
};


@NgModule({
  declarations: [
    MyApp,
    TypesPage,
    RecordListPage,
    RecordPage,
    ResumePage,
    ResumeListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TypesPage,
    RecordListPage,
    RecordPage,
    ResumePage,
    ResumeListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
