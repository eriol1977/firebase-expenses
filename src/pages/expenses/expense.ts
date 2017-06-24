import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
    selector: 'expense',
    templateUrl: 'expense.html'
})
export class Expense {

    date: string;
    value: string;
    types: FirebaseListObservable<any>;
    notes: string;
    
    // the following because [compareWith] doesn't work in the select component
    typesForCodeComparison: any[];
    typeCode: string;

    constructor(public params: NavParams,
        public viewCtrl: ViewController,
        db: AngularFireDatabase) {
        this.date = this.params.get('date');
        this.value = this.params.get('value');
        this.types = db.list('/types', {
            query: {
                orderByChild: 'code'
            }
        });
        this.notes = this.params.get('notes');
        
        // the following because [compareWith] doesn't work in the select component
        db.list('/types').subscribe(ts => {
            this.typesForCodeComparison = ts;
        })
        this.typeCode = this.params.get('typeCode');
    }

    dismiss(save: boolean) {
        // the following because [compareWith] doesn't work in the select component
        var type: any;
        this.typesForCodeComparison.forEach(t => {if (t.code == this.typeCode) type = t;});
        
        let data = {'save': save, 'date': this.date, 'value': this.value, 'type': type, 'notes': this.notes};
        this.viewCtrl.dismiss(data);
    }
}
