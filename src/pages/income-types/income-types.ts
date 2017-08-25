import {Component} from '@angular/core';

import { IncomeType } from './income-type';
import { INCOME_TYPES } from './income-types-provider';

@Component({
    templateUrl: 'income-types.html'
})
export class IncomeTypesPage {

    types: IncomeType[] = INCOME_TYPES;

    constructor() {}
}
