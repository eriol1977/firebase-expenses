import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
        this.types = db.list('/types');
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
                            description: data.description
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

    showOptions(id, code, description) {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Elimina',
                    role: 'destructive',
                    handler: () => {
                        this.removeType(id);
                    }
                },{
                    text: 'Modifica',
                    handler: () => {
                        this.updateType(id, code, description);
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
    
    removeType(id: string){
        this.types.remove(id);
    }
    
    updateType(id, code, description): void {
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
                            description: data.description
                        });
                    }
                }
            ]
        });
        prompt.present();
    }
}
