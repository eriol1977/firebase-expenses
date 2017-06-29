import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { TypesPage } from '../pages/types/types';
import { ExpensesPage } from '../pages/expenses/expenses';
import { Expense } from '../pages/expenses/expense';
import { ResumePage } from '../pages/resume/resume';
import { ResumeExpensesPage } from '../pages/resume/resume-expenses';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
 
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
    ExpensesPage,
    Expense,
    ResumePage,
    ResumeExpensesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TypesPage,
    ExpensesPage,
    Expense,
    ResumePage,
    ResumeExpensesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
