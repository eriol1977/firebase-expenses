import {Component} from '@angular/core';
import {NavParams, ViewController, ToastController} from 'ionic-angular';

import {Type} from '../types/type';
import {EXPENSE_TYPES} from '../types/types-provider';

@Component({
    templateUrl: 'expense.html'
})
export class Expense {

    date: string;
    value: string;
    types: Type[] = EXPENSE_TYPES;
    notes: string;

    // the following because [compareWith] doesn't work in the select component
    typeCode: string;

    constructor(public params: NavParams,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController) {
        this.date = this.params.get('date');
        this.value = this.params.get('value');
        this.notes = this.params.get('notes');

        // the following because [compareWith] doesn't work in the select component
        this.typeCode = this.params.get('typeCode');
    }

    dismiss(save: boolean) {
        if(save && !this.validateExpense())
            return;

        // the following because [compareWith] doesn't work in the select component
        var type: any;
        this.types.forEach(t => {if (t.code == this.typeCode) type = t;});

        let data = {'save': save, 'date': this.date, 'value': this.value, 'type': type, 'notes': this.notes};
        this.viewCtrl.dismiss(data);
    }

    private validateExpense() : boolean {
        var result = true;
        if (!this.date) {
            this.alertMessage('Inserire una data');
            result = false;
        }else if (!this.value) {
            this.alertMessage('Inserire un valore');
            result = false;
        }else if (!this.typeCode) {
            this.alertMessage('Inserire un tipo di spesa');
            result = false;
        }
        return result;
    }

    private alertMessage(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}
