import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {
    expenses: FirebaseListObservable<any>;
    date: string;

    constructor(public navCtrl: NavController, 
                public alertCtrl: AlertController, 
                public actionSheetCtrl: ActionSheetController,
                db: AngularFireDatabase) {
        this.date = new Date().toISOString();
        this.expenses = db.list('/expenses');
    }
    
    addExpense(): void {
        let prompt = this.alertCtrl.create({
            title: 'Spesa',
            inputs: [
                {
                    name: 'date',
                    placeholder: 'gg/mm/aaaa',
                    type: 'date' 
                },
                {
                    name: 'value',
                    placeholder: '999.99',
                    type: 'number' 
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    handler: data => {}
                },
                {
                    text: 'Salva',
                    handler: data => {
                        this.expenses.push({
                            date: data.date,
                            value: data.value
                        });
                    }
                }
            ]
        });
        prompt.present();
    }
    
    showOptions(id: string, value: string) {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Elimina',
                    role: 'destructive',
                    handler: () => {
                        this.removeExpense(id);
                    }
                },{
                    text: 'Modifica',
                    handler: () => {
                        this.updateExpense(id, value);
                    }
                },{
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {}
                }
            ]
        });
        actionSheet.present();
    }
    
    removeExpense(id: string){
        this.expenses.remove(id);
    }
    
    updateExpense(id: string, value: string): void {
        let prompt = this.alertCtrl.create({
            title: 'Spesa',
            inputs: [
                {
                    name: 'value',
                    placeholder: 'Valore',
                    type: 'number',
                    value: parseFloat(value).toFixed(2)
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    handler: data => {}
                },
                {
                    text: 'Salva',
                    handler: data => {
                        this.expenses.update(id, {
                            value: data.value
                        });
                    }
                }
            ]
        });
        prompt.present();
    }
}