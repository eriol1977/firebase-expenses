import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import { Type } from './type';
import { EXPENSE_TYPES, INCOME_TYPES } from './types-provider';

@Component({
    templateUrl: 'types.html'
})
export class TypesPage {

    kind: string; // E = Expense, I = Income
    types: Type[];

    constructor(public params: NavParams) {
        if(this.params.get('kind')) {
            this.kind = this.params.get('kind');
            if(this.kind == "E")
                this.types = EXPENSE_TYPES;
            else
                this.types = INCOME_TYPES;
        }else{
            this.kind = 'E';
            this.types = EXPENSE_TYPES;
        }
    }
}
