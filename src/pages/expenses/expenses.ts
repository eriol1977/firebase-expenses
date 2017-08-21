import {Component} from '@angular/core';
import {NavController, AlertController, ActionSheetController, ModalController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Expense} from './expense';

@Component({
    templateUrl: 'expenses.html'
})
export class ExpensesPage {
    db: AngularFireDatabase;
    expenses: FirebaseListObservable<any>;
    date: string;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        db: AngularFireDatabase) {
            this.db = db;
            this.date = new Date().toISOString();
            this.expenses = this.db.list('/expenses', {
                query: {
                    orderByChild: 'date',
                    equalTo: this.date.substring(0, 10)
                }
            });
    }

    onDateChanged(): void {
        this.expenses = this.db.list('/expenses', {
            query: {
                orderByChild: 'date',
                equalTo: this.date.substring(0, 10)
            }
        });
    }

    addExpense(): void {
        let modal = this.modalCtrl.create(Expense, {date: this.date.substring(0, 10), extra: false}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.expenses.push({
                    date: data.date,
                    value: data.value,
                    type: data.type,
                    notes: (data.notes != null ? data.notes : ""),
                    extra: data.extra
                });
            }
        });
        modal.present();
    }

    confirmDelete(id: string) {
        let alert = this.alertCtrl.create({
            title: 'Conferma eliminazione',
            message: 'Sei sicuro di voler eliminare la Spesa?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Conferma',
                    handler: () => {
                        this.deleteExpense(id);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteExpense(id: string) {
        this.expenses.remove(id);
    }

    updateExpense(id: string, date: string, value: string, type: any, notes: string, extra: boolean): void {
        let modal = this.modalCtrl.create(Expense, {date: date, value: parseFloat(value).toFixed(2), typeCode: type.code, extra: extra, notes: notes}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.expenses.update(id, {
                    date: data.date,
                    value: data.value,
                    type: data.type,
                    notes: (data.notes != null ? data.notes : ""),
                    extra: data.extra
                });
            }
        });
        modal.present();
    }
}