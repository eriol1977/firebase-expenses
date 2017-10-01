import {Component} from '@angular/core';
import {NavParams, NavController, AlertController, ActionSheetController, ModalController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {RecordPage} from './record-page';

@Component({
    templateUrl: 'record-list.html'
})
export class RecordListPage {
    db: AngularFireDatabase;
    records: FirebaseListObservable<any>;
    date: string;
    kind: string; // E = Expense, I = Income
    tableName : string;

    constructor(public navCtrl: NavController,
        public params: NavParams,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        db: AngularFireDatabase) {
            this.db = db;
            this.date = new Date().toISOString();
            if(this.params.get('kind')) {
                this.kind = this.params.get('kind');
                if(this.kind == "E")
                    this.tableName = "/expenses";
                else
                    this.tableName = "/incomes";
            }else{
                this.kind = 'E';
                this.tableName = "/expenses";
            }
            this.records = this.db.list(this.tableName, {
                query: {
                    orderByChild: 'date',
                    equalTo: this.date.substring(0, 10)
                }
            });
    }

    onDateChanged(): void {
        this.records = this.db.list(this.tableName, {
            query: {
                orderByChild: 'date',
                equalTo: this.date.substring(0, 10)
            }
        });
    }

    addRecord(): void {
        let modal = this.modalCtrl.create(RecordPage, {kind: this.kind, date: this.date.substring(0, 10), extra: false}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.records.push({
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
            message: "Sei sicuro di voler eliminare l'elemento?",
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Conferma',
                    handler: () => {
                        this.deleteRecord(id);
                    }
                }
            ]
        });
        alert.present();
    }

    deleteRecord(id: string) {
        this.records.remove(id);
    }

    updateRecord(id: string, date: string, value: string, type: any, notes: string, extra: boolean): void {
        let modal = this.modalCtrl.create(RecordPage, {kind: this.kind, date: date, value: parseFloat(value).toFixed(2), typeCode: type.code, extra: extra, notes: notes}, {enableBackdropDismiss: false});
        modal.onDidDismiss(data => {
            if (data.save) {
                this.records.update(id, {
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