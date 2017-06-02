import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ExpenseType } from './expense-type';
import { ExpenseTypesService } from './expense-types.service';

@Component({
  selector: 'update-type',
  templateUrl: './update-type.html'
})

export class UpdateTypePage { 
    
    type: ExpenseType;
    types: ExpenseType[];
    
    constructor(public navCtrl: NavController, 
                private navParams: NavParams, 
                private alertCtrl: AlertController,
                private expenseTypesService: ExpenseTypesService) {
        this.type = this.navParams.get('type');
        this.types = this.navParams.get('types');
    }
  
    confirmDelete() {
        let alert = this.alertCtrl.create({
            title: 'Conferma eliminazione',
            message: 'Sei sicuro di voler eliminare il Tipo di Spesa ' + this.type.code + '?',
            buttons: [
              {
                text: 'Annulla',
                role: 'cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Conferma',
                handler: () => {
                  this.deleteType();
                }
              }
            ]
          });
        alert.present();
    }
    
    deleteType(): void {
        this.expenseTypesService
            .delete(this.type.id)
                .then(() => {
                    this.types.splice(this.types.indexOf(this.type),1);
                    this.navCtrl.pop();
                });
    }

    updateType(): void {
        this.expenseTypesService.update(this.type)
		.then(() => this.navCtrl.pop());
    }
    
}