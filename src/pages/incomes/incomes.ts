import {Component} from '@angular/core';
import {NavController, AlertController, ActionSheetController, ModalController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Income} from './income';

@Component({
    templateUrl: 'incomes.html'
})
export class IncomesPage {
    db: AngularFireDatabase;
    incomes: FirebaseListObservable<any>;
    date: string;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        db: AngularFireDatabase) {
            this.db = db;
            this.date = new Date().toISOString();
            this.incomes = this.db.list('/incomes', {
                query: {
                    orderByChild: 'date',
                    equalTo: this.date.substring(0, 10)
                }
            });
    }

    onDateChanged(): void {
        this.incomes = this.db.list('/incomes', {
            query: {
                orderByChild: 'date',
                equalTo: this.date.substring(0, 10)
            }
        });
    }

    addIncome(): void {
        let modal = this.modalCtrl.create(Income, {date: this.date.substring(0, 10), extra: false}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.incomes.push({
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
            message: 'Sei sicuro di voler eliminare l\'entrata?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Conferma',
                    handler: () => {
                        this.deleteIncome(id);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteIncome(id: string) {
        this.incomes.remove(id);
    }

    updateIncome(id: string, date: string, value: string, type: any, notes: string, extra: boolean): void {
        let modal = this.modalCtrl.create(Income, {date: date, value: parseFloat(value).toFixed(2), typeCode: type.code, extra: extra, notes: notes}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.incomes.update(id, {
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