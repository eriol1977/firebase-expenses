import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {Type} from '../record-types/type';

@Component({
    templateUrl: 'resume-detail.html'
})
export class ResumeDetailPage {
    
    type: Type;
    month: string;
    year: string
    records: any[];
    total: number;
    
    constructor(public params: NavParams) {
        this.type = this.params.get('type');
        this.getYear(this.params.get('period'));
        this.getMonth(this.params.get('period'));
        this.records = this.params.get('records');
        this.total = this.params.get('total');
    }
    
    private getYear(period: string) : void {
        this.year = period.substring(0,4);
    }
    
    private getMonth(period: string): void {
        let monthNum = period.substring(5,7);
        switch(monthNum) {
            case '01':
                this.month = "Gennaio";
                break;
            case '02':
                this.month = "Febbraio";
                break;
            case '03':
                this.month = "Marzo";
                break;
            case '04':
                this.month = "Aprile";
                break;
            case '05':
                this.month = "Maggio";
                break;
            case '06':
                this.month = "Giugno";
                break;
            case '07':
                this.month = "Luglio";
                break;
            case '08':
                this.month = "Agosto";
                break;
            case '09':
                this.month = "Settembre";
                break;
            case '10':
                this.month = "Ottobre";
                break;
            case '11':
                this.month = "Novembre";
                break;
            case '12':
                this.month = "Dicembre";
                break;
        }
    }
    
}


