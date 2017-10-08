import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import {Type} from '../record-types/type';
import {EXPENSE_TYPES, INCOME_TYPES} from '../record-types/types-provider';
import {MONTHS} from '../../app/utility/date-utils'
import {ResumeDetailPage} from './resume-detail-page';

@Component({
    templateUrl: 'resume-by-type.html'
})
export class ResumeByTypePage {

    kind: string; // E = Expense, I = Income
    db: AngularFireDatabase;
    tableName : string;
    records: any[] = new Array();
    types: Type[];
    months: string[];
    year: string;
    typeCode: string;
    totalsMap: Map<string, number> = new Map<string, number>();
    recordsByMonth: Map<string,any[]> = new Map<string,any[]>();
    grandTotal: number;
    extras: Map<string, boolean> = new Map<string, boolean>();

    constructor(public navCtrl: NavController,public params: NavParams,
        db: AngularFireDatabase) {
        
        if(this.params.get('kind')) {
            this.kind = this.params.get('kind');
            if(this.kind == "E") {
                this.types = EXPENSE_TYPES;
                this.tableName = "/expenses";
            }else{
                this.types = INCOME_TYPES;
                this.tableName = "/incomes";
            }
        }else{
            this.kind = 'E';
            this.types = EXPENSE_TYPES;
            this.tableName = "/expenses";
        }

        this.db = db;
        this.year = new Date().toISOString().substring(0, 4);
        this.months = MONTHS;

        this.typeCode = this.types[0].code;

        this.loadRecords();
    }

    onTypeChanged(): void {
        this.loadRecords();
    }

    onYearChanged(): void {
        this.loadRecords();
    }

    getTotal(month: string): number {
        let total = this.totalsMap.get(month);
        if (!total)
            return 0;
        return total;
    }

    hasExtra(month: string): boolean {
        let result = this.extras.get(month);
        if (!result)
            return false;
        return result;
    }

    private calculateTotals(): void {
        let month: string;
        let total: number;
        let value: number;
        let exp: any[];
        this.totalsMap = new Map<string, number>();
        this.recordsByMonth = new Map<string,any[]>();
        this.extras = new Map<string, boolean>();
        this.grandTotal = 0;
        for (let record of this.records) {
            month = record.date.substring(5,7);
            value = parseFloat(record.value);
            total = this.totalsMap.get(month);
            if (!total) {
                total = value;
            } else {
                total += value;
            }
            this.grandTotal += value;
            this.totalsMap.set(month, total);
            
            // records by type, to be used by the RecordsResume page
            exp = this.recordsByMonth.get(month);
            if(!exp){
                exp = new Array();
                this.recordsByMonth.set(month,exp);
            }
            exp.push(record);

            // extraordinary records check
            if(record.extra) {
                this.extras.set(month,true);
            }
        }
    }

    private loadRecords(): void {
        this.db.list(this.tableName, {
            query: {
                orderByChild: 'type/code',
                equalTo: this.typeCode
            }
        }).subscribe(records => {
            this.records = [];
            for(var i = 0; i < records.length; i++)
                if(records[i].date.startsWith(this.year))
                    this.records.push(records[i]);
            this.calculateTotals();
        });
    }

    showRecords(month: string): void {
        var type: any;
        this.types.forEach(t => {if (t.code == this.typeCode) type = t;});
        this.navCtrl.push(ResumeDetailPage, {type: type, period: this.year + '-' + month, records: this.recordsByMonth.get(month), total: this.totalsMap.get(month)})
    }
}