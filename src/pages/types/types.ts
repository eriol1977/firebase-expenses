import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ExpenseType } from './expense-type';
import { ExpenseTypesService } from './expense-types.service';
import { AddTypePage} from './add-type'
import { UpdateTypePage} from './update-type'

@Component({
  selector: 'page-types',
  templateUrl: 'types.html'
})
export class TypesPage {

  types: ExpenseType[] = [];

  constructor(public navCtrl: NavController, private expenseTypesService: ExpenseTypesService) {}
  
  getTypes(): void {
    this.expenseTypesService.getTypes().then(types => this.types = types);
  }

  addType(): void {
    this.navCtrl.push(AddTypePage, {
        types: this.types
    });
  }

  updateType(type: ExpenseType): void {
    this.navCtrl.push(UpdateTypePage, {
        type: type,
        types: this.types
    });  
  }
  
  ngOnInit(): void {
    this.getTypes();
  }
}
