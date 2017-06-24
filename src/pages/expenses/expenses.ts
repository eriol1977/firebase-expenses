import {Component} from '@angular/core';
import {NavController, AlertController, ActionSheetController, ModalController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Expense} from './expense';

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
        public modalCtrl: ModalController,
        db: AngularFireDatabase) {
            this.date = new Date().toISOString();
            this.expenses = db.list('/expenses');
    }

    addExpense(): void {
        let modal = this.modalCtrl.create(Expense, {date: this.date.substring(0, 10)},{enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.expenses.push({
                    date: data.date,
                    value: data.value,
                    type: data.type,
                    notes: data.notes
                });
            }
        });
        modal.present();
    }

    showOptions(id: string, date: string, value: string, type: any, notes: string) {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Elimina',
                    role: 'destructive',
                    handler: () => {
                        this.removeExpense(id);
                    }
                }, {
                    text: 'Modifica',
                    handler: () => {
                        this.updateExpense(id, date, value, type, notes);
                    }
                }, {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {}
                }
            ]
        });
        actionSheet.present();
    }

    removeExpense(id: string) {
        this.expenses.remove(id);
    }

    updateExpense(id: string, date: string, value: string, type: any, notes: string): void {
        let modal = this.modalCtrl.create(Expense, {date: date, value: parseFloat(value).toFixed(2), typeCode: type.code, notes: notes},{enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.expenses.update(id, {
                    date: data.date,
                    value: data.value,
                    type: data.type,
                    notes: data.notes
                });
            }
        });
        modal.present();
    }
}