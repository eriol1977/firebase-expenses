import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import {Type} from '../record-types/type';
import {EXPENSE_TYPES} from '../record-types/types-provider';
import {DateUtils} from '../../app/utility/date-utils'

@Component({
    templateUrl: 'limits.html'
})
export class LimitsPage {

    db: AngularFireDatabase;
    types: Type[];
    period: string;

    constructor(public navCtrl: NavController,public params: NavParams,
        db: AngularFireDatabase) {
        this.db = db;
        this.types = EXPENSE_TYPES;
        this.period = DateUtils.getThisYearMonth();
    }

    onPeriodChanged(): void {
        
    }

    onRangeChange(typeCode: string, ev: any) {
        // TODO
        console.log('Changed ' + typeCode, ev.value);
    }
}