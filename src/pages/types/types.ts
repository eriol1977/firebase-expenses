import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ExpenseType } from './expense-type';
import { ExpenseTypesService } from './expense-types.service';

@Component({
  selector: 'page-types',
  templateUrl: 'types.html'
})
export class TypesPage {

  types: ExpenseType[] = [];
  selectedType: ExpenseType;

  constructor(public navCtrl: NavController, private expenseTypesService: ExpenseTypesService) {}
  
  getTypes(): void {
    this.expenseTypesService.getTypes().then(types => this.types = types);
  }

  addType(code: string, description: string): void {
	  code = code.trim();
	  description = description.trim();
	  if (!code || !description) { return; }
	  this.expenseTypesService.create(code,description)
		.then(type => {
		  this.types.push(type);
		  this.selectedType = null;
		});
  }
  
  deleteType(type: ExpenseType): void {
	  this.expenseTypesService
		  .delete(type.id)
		  .then(() => {
			this.types = this.types.filter(t => t !== type);
			if (this.selectedType === type) { this.selectedType = null; }
		  });
  }
  
  updateType(type: ExpenseType): void {
        
  }
  
  ngOnInit(): void {
    this.getTypes();
  }
}
