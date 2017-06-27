import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {Type} from '../types/type';
import {EXPENSE_TYPES} from '../types/types-provider';

@Component({
    templateUrl: 'resume.html'
})
export class ResumePage {
    db: AngularFireDatabase;
    expenses: any[] = new Array();
    types: Type[] = EXPENSE_TYPES;
    period: string;
    totalsMap: Map<string, number> = new Map<string, number>();
    grandTotal: number;

    constructor(public navCtrl: NavController,
        db: AngularFireDatabase) {
        this.db = db;
        this.period = new Date().toISOString().substring(0, 7);
        this.loadExpenses();
    }

    onPeriodChanged(): void {
        this.loadExpenses();
    }

    getTotal(typeCode: string): number {
        let total = this.totalsMap.get(typeCode);
        if(!total)
            return 0;
        return total;
    }

    private calculateTotals(): void {
        let typeCode: string;
        let total: number;
        let value: number;
        this.totalsMap = new Map<string, number>();
        this.grandTotal = 0;
        for (let expense of this.expenses) {
            typeCode = expense.type.code;
            value = parseFloat(expense.value);
            total = this.totalsMap.get(typeCode);
            if(!total) {
                total = value;
            }else{
                total += value;
            }
            this.grandTotal += value;
            this.totalsMap.set(typeCode,total);
        }
    }

    private loadExpenses(): void {
        this.db.list('/expenses', {
            query: {
                orderByChild: 'date',
                startAt: this.period,
                endAt: this.getNextPeriod()
            }
        }).subscribe(expenses => {
            this.expenses = expenses;
            this.calculateTotals();
        });
    }

    private getNextPeriod(): string {
                var year = parseInt(this.period.substring(0, 4));
                var month = parseInt(this.period.substring(5, 7));
                var nextMonth = month + 1;
                var nextYear = year;
                if(nextMonth == 13) {
                    nextMonth = 1;
                    nextYear++;
                }
        var nextMonthStr = (nextMonth < 10 ? "0" + nextMonth : "" + nextMonth);
                return nextYear + "-" + nextMonthStr;
            }
}