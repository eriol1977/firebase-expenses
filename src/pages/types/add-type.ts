import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ExpenseType } from './expense-type';
import { ExpenseTypesService } from './expense-types.service';

@Component({
  selector: 'add-type',
  templateUrl: './add-type.html'
})

export class AddTypePage { 
    
    type: ExpenseType = new ExpenseType();
    types: ExpenseType[];
    
    constructor(public navCtrl: NavController, 
                private navParams: NavParams, 
                private expenseTypesService: ExpenseTypesService) {
        this.types = this.navParams.get('types');
    }
  
    addType(): void {
        this.expenseTypesService.createType(this.type)
		.then(type => {
                    this.types.push(type);
                    this.navCtrl.pop();
		});
    }
    
}