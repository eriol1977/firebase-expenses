import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import {Type} from '../record-types/type';
import {EXPENSE_TYPES, INCOME_TYPES} from '../record-types/types-provider';
import {ResumeDetailPage} from './resume-detail-page';

@Component({
    templateUrl: 'resume-by-period.html'
})
export class ResumeByPeriodPage {

    kind: string; // E = Expense, I = Income
    db: AngularFireDatabase;
    tableName : string;
    records: any[] = new Array();
    types: Type[];
    period: string;
    totalsMap: Map<string, number> = new Map<string, number>();
    recordsByType: Map<string,any[]> = new Map<string,any[]>();
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
        this.period = new Date().toISOString().substring(0, 7);
        this.loadRecords();
    }

    onPeriodChanged(): void {
        this.loadRecords();
    }

    getTotal(typeCode: string): number {
        let total = this.totalsMap.get(typeCode);
        if (!total)
            return 0;
        return total;
    }

    hasExtra(typeCode: string): boolean {
        let result = this.extras.get(typeCode);
        if (!result)
            return false;
        return result;
    }

    private calculateTotals(): void {
        let typeCode: string;
        let total: number;
        let value: number;
        let exp: any[];
        this.totalsMap = new Map<string, number>();
        this.recordsByType = new Map<string,any[]>();
        this.extras = new Map<string, boolean>();
        this.grandTotal = 0;
        for (let record of this.records) {
            typeCode = record.type.code;
            value = parseFloat(record.value);
            total = this.totalsMap.get(typeCode);
            if (!total) {
                total = value;
            } else {
                total += value;
            }
            this.grandTotal += value;
            this.totalsMap.set(typeCode, total);
            
            // records by type, to be used by the RecordsResume page
            exp = this.recordsByType.get(typeCode);
            if(!exp){
                exp = new Array();
                this.recordsByType.set(typeCode,exp);
            }
            exp.push(record);

            // extraordinary records check
            if(record.extra) {
                this.extras.set(typeCode,true);
            }
        }
    }

    private loadRecords(): void {
        this.db.list(this.tableName, {
            query: {
                orderByChild: 'date',
                startAt: this.period,
                endAt: this.getNextPeriod()
            }
        }).subscribe(records => {
            this.records = records;
            this.calculateTotals();
        });
    }

    private getNextPeriod(): string {
        var year = parseInt(this.period.substring(0, 4));
        var month = parseInt(this.period.substring(5, 7));
        var nextMonth = month + 1;
        var nextYear = year;
        if (nextMonth == 13) {
            nextMonth = 1;
            nextYear++;
        }
        var nextMonthStr = (nextMonth < 10 ? "0" + nextMonth : "" + nextMonth);
        return nextYear + "-" + nextMonthStr;
    }
    
    showRecords(type: Type): void {
        this.navCtrl.push(ResumeDetailPage, {type: type, period: this.period, records: this.recordsByType.get(type.code), total: this.totalsMap.get(type.code)})
    }
}