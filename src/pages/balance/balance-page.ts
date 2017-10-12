import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import {MONTHS} from '../../app/utility/date-utils'

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

    constructor(public navCtrl: NavController,public params: NavParams,
        db: AngularFireDatabase) {
        this.db = db;
        this.months = MONTHS;
        this.year = new Date().toISOString().substring(0, 4);
        this.loadRecords();
    }

    onYearChanged(): void {
        this.loadRecords();
    }

    private loadRecords(): void {
        this.db.list('/incomes', {
            query: {
                orderByChild: 'date',
                startAt: this.year,
            }
        }).subscribe(incomes => {
            this.incomes = incomes;
            this.calculateIncomesData();
        });

        this.db.list('/expenses', {
            query: {
                orderByChild: 'date',
                startAt: this.year,
            }
        }).subscribe(expenses => {
            this.expenses = expenses;
            this.calculateExpensesData();
        }); 
    }

    private calculateIncomesData() {
        let monthNumber: string;
        let value: number;
        let inc: number;
        this.initIncomesMaps();
        
        for (let income of this.incomes) {
            monthNumber = income.date.substring(5,7);
            value = parseFloat(income.value);

            // sums incomes by month
            inc = this.incomesByMonth.get(monthNumber);
            inc += value;
            this.incomesByMonth.set(monthNumber, inc);

            // TODO progressives
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

    private calculateExpensesData() {
        let monthNumber: string;
        let value: number;
        let exp: number;
        this.initExpensesMaps();
        for (let expense of this.expenses) {
            monthNumber = expense.date.substring(5,7);
            value = parseFloat(expense.value);

            // sums expenses by month
            exp = this.expensesByMonth.get(monthNumber);
            exp += value;
            this.expensesByMonth.set(monthNumber, exp);

            // TODO progressives
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

    showRecords(month: string): void {
        /* var type: any;
        this.types.forEach(t => {if (t.code == this.typeCode) type = t;});
        this.navCtrl.push(ResumeDetailPage, {type: type, period: this.year + '-' + month, records: this.recordsByMonth.get(month), total: this.totalsMap.get(month)}); */
    }
}