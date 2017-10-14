import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import {MONTHS} from '../../app/utility/date-utils'
import {DateUtils} from '../../app/utility/date-utils'

@Component({
    templateUrl: 'balance.html'
})
export class BalancePage {

    db: AngularFireDatabase;
    months: any[];
    year: string;
    incomes: any[];
    expenses: any[];
    incomesByMonth: Map<string, number> = new Map<string, number>();
    expensesByMonth: Map<string, number> = new Map<string, number>();
    progressiveIncomesByMonth: Map<string, number> = new Map<string, number>();
    progressiveExpensesByMonth: Map<string, number> = new Map<string, number>();
    nextMonthNumber: string;
    monthsToShow: any[];

    constructor(public navCtrl: NavController,public params: NavParams,
        db: AngularFireDatabase) {
        this.db = db;
        this.months = MONTHS;
        this.year = DateUtils.getThisYearNumber();
        this.nextMonthNumber = DateUtils.getNextMonthNumber();
        this.loadRecords();
    }

    onYearChanged(): void {
        this.loadRecords();
    }

    private loadRecords(): void {
        this.initIncomesMaps();
        this.initExpensesMaps();
        // for this year's balance, the query only gets data until the present month
        // for past years, the query gets all months' data
        let endMonth = (parseInt(this.year) < parseInt(DateUtils.getThisYearNumber()) ? '13' : this.nextMonthNumber);
        this.monthsToShow = DateUtils.getMonthsUntil(parseInt(endMonth));
        
        this.db.list('/incomes', {
            query: {
                orderByChild: 'date',
                startAt: this.year + '-01',
                endAt: this.year + '-' + endMonth
            }
        }).subscribe(incomes => {
            this.incomes = incomes;
            this.calculateData('I');
        });

        this.db.list('/expenses', {
            query: {
                orderByChild: 'date',
                startAt: this.year + '-01',
                endAt: this.year + '-' + endMonth
            }
        }).subscribe(expenses => {
            this.expenses = expenses;
            this.calculateData('E');
        }); 
    }

    private calculateData(kind) {
        let monthNumber: string;
        let value: number;
        let presentValue: number;
        let records;
        let recordsByMonth;
        let progressivesByMonth;

        if(kind == 'I') {
            records = this.incomes;
            recordsByMonth = this.incomesByMonth;
            progressivesByMonth = this.progressiveIncomesByMonth;
        }else{
            records = this.expenses;
            recordsByMonth = this.expensesByMonth;
            progressivesByMonth = this.progressiveExpensesByMonth;
        }
        
        for (let record of records) {
            monthNumber = record.date.substring(5,7);
            value = parseFloat(record.value);

            // sums values by month
            presentValue = recordsByMonth.get(monthNumber);
            presentValue += value;
            recordsByMonth.set(monthNumber, presentValue);
        }

        // progressives by month
        progressivesByMonth.set(this.months[0].number,recordsByMonth.get(this.months[0].number));
        for (var i=1; i < this.months.length; i++) {
           progressivesByMonth.set(this.months[i].number,
            recordsByMonth.get(this.months[i].number) + progressivesByMonth.get(this.months[i-1].number)); 
        }
    } 

    private initIncomesMaps() {
        this.incomesByMonth = new Map<string, number>();
        this.progressiveIncomesByMonth = new Map<string,number>();
        for (let month of this.months) {
             this.incomesByMonth.set(month.number, 0);
             this.progressiveIncomesByMonth.set(month.number, 0);
        }
    }

    private initExpensesMaps() {
        this.expensesByMonth = new Map<string, number>();
        this.progressiveExpensesByMonth = new Map<string,number>();
        for (let month of this.months) {
             this.expensesByMonth.set(month.number, 0);
             this.progressiveExpensesByMonth.set(month.number, 0);
        }
    }

    getIncome(monthNumber): number {
        return this.incomesByMonth.get(monthNumber);
    }

    getExpense(monthNumber): number {
        return this.expensesByMonth.get(monthNumber);
    }

    getBalance(monthNumber): number {
        return this.getIncome(monthNumber) - this.getExpense(monthNumber);
    }

    getProgressiveIncome(monthNumber): number {
        return this.progressiveIncomesByMonth.get(monthNumber);
    }

    getProgressiveExpense(monthNumber): number {
        return this.progressiveExpensesByMonth.get(monthNumber);
    }

    getProgressiveBalance(monthNumber): number {
        return this.getProgressiveIncome(monthNumber) - this.getProgressiveExpense(monthNumber);
    }
}