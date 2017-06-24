import {Component} from '@angular/core';
import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
    selector: 'page-types',
    templateUrl: 'types.html'
})
export class TypesPage {

    types: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        db: AngularFireDatabase) {
        this.types = db.list('/types', {
            query: {
                orderByChild: 'code'
            }
        });
    }

    addType(): void {
        let prompt = this.alertCtrl.create({
            title: 'Tipo di Spesa',
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Codice'
                },
                {
                    name: 'description',
                    placeholder: 'Descrizione'
                },
                {
                    name: 'icon',
                    placeholder: 'Icona'
                },
                {
                    name: 'notes',
                    placeholder: 'Note'
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
                        this.types.push({
                            code: data.code,
                            description: data.description,
                            icon: data.icon,
                            notes: data.notes
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

    deleteType(id: string) {
        this.types.remove(id);
    }

    confirmDelete(id: string, type: any) {
        let alert = this.alertCtrl.create({
            title: 'Conferma eliminazione',
            message: 'Sei sicuro di voler eliminare il Tipo di Spesa ' + type.code + '?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Conferma',
                    handler: () => {
                        this.deleteType(id);
                    }
                }
            ]
        });
        alert.present();
    }

    updateType(id: string, code: string, description: string, icon: string, notes: string): void {
        let prompt = this.alertCtrl.create({
            title: 'Tipo di Spesa',
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Codice',
                    value: code
                },
                {
                    name: 'description',
                    placeholder: 'Descrizione',
                    value: description
                },
                {
                    name: 'notes',
                    placeholder: 'Note',
                    value: notes
                },
                {
                    name: 'icon',
                    placeholder: 'Icona',
                    value: icon
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
                        this.types.update(id, {
                            code: data.code,
                            description: data.description,
                            icon: data.icon,
                            notes: data.notes
                        });
                    }
                }
            ]
        });
        prompt.present();
    }
}
