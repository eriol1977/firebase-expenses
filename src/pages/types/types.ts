import {Component} from '@angular/core';

import { Type } from './type';
import { EXPENSE_TYPES } from './types-provider';

@Component({
    templateUrl: 'types.html'
})
export class TypesPage {

    types: Type[] = EXPENSE_TYPES;

    constructor() {}
}
