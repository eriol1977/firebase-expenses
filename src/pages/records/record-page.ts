import {Component, ViewChild} from '@angular/core';
import {NavParams, ViewController, ToastController} from 'ionic-angular';

import {Type} from '../record-types/type';
import {EXPENSE_TYPES, INCOME_TYPES} from '../record-types/types-provider';

@Component({
    templateUrl: 'record.html'
})
export class RecordPage {

    kind: string; // E = Expense, I = Income
    date: string;
    value: string;
    types: Type[];
    notes: string;
    extra: boolean;

    // the following because [compareWith] doesn't work in the select component
    typeCode: string;

    @ViewChild('inputToFocus') inputToFocus;

    constructor(public params: NavParams,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController) {

            if(this.params.get('kind')) {
                this.kind = this.params.get('kind');
                if(this.kind == "E")
                    this.types = EXPENSE_TYPES;
                else
                    this.types = INCOME_TYPES;
            }else{
                this.kind = 'E';
                this.types = EXPENSE_TYPES;
            }

            this.date = this.params.get('date');
            this.value = this.params.get('value');
            this.notes = this.params.get('notes');
            this.extra = this.params.get('extra');

            // the following because [compareWith] doesn't work in the select component
            this.typeCode = this.params.get('typeCode');
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.inputToFocus.setFocus();
        }, 150);
    }

    dismiss(save: boolean) {
        if (save && !this.validateRecord())
            return;

        // the following because [compareWith] doesn't work in the select component
        var type: any;
        this.types.forEach(t => {if (t.code == this.typeCode) type = t;});

        let data = {'save': save, 'date': this.date, 'value': this.value, 'type': type, 'notes': this.notes, 'extra': this.extra};
        this.viewCtrl.dismiss(data);
    }

    private validateRecord(): boolean {
        var result = true;
        if (!this.date) {
            this.alertMessage('Inserisci una data');
            result = false;
        } else if (!this.value) {
            this.alertMessage('Inserisci un valore');
            result = false;
        } else if (!this.typeCode) {
            this.alertMessage('Inserisci un tipo');
            result = false;
        }
        return result;
    }

    private alertMessage(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}
