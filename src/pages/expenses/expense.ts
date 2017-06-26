import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

import { Type } from '../types/type';
import { EXPENSE_TYPES } from '../types/types-provider';

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
        public viewCtrl: ViewController) {
        this.date = this.params.get('date');
        this.value = this.params.get('value');
        this.notes = this.params.get('notes');
        
        // the following because [compareWith] doesn't work in the select component
        this.typeCode = this.params.get('typeCode');
    }

    dismiss(save: boolean) {
        // the following because [compareWith] doesn't work in the select component
        var type: any;
        this.types.forEach(t => {if (t.code == this.typeCode) type = t;});
        
        let data = {'save': save, 'date': this.date, 'value': this.value, 'type': type, 'notes': this.notes};
        this.viewCtrl.dismiss(data);
    }
}
