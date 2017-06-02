import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ExpenseType } from './expense-type';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpenseTypesService {
	
    private typesUrl = 'http://ec2-52-41-136-68.us-west-2.compute.amazonaws.com/expenses/rest/types';  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getTypes(): Promise<ExpenseType[]> {
        return this.http.get(this.typesUrl)
                           .toPromise()
                           .then(response => response.json() as ExpenseType[])
                           .catch(this.handleError);
    }

    getType(id: number): Promise<ExpenseType> {
        const url = `${this.typesUrl}/${id}`;
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as ExpenseType)
                .catch(this.handleError);
    }

    create(code: string, description: string): Promise<ExpenseType> {
        return this.http
                .post(this.typesUrl, JSON.stringify({code: code, description: description}), {headers: this.headers})
                .toPromise()
                .then(response => response.json() as ExpenseType)
                .catch(this.handleError);
    }

    update(type: ExpenseType): Promise<ExpenseType> {
        const url = `${this.typesUrl}`;
        return this.http
                .put(url, JSON.stringify(type), {headers: this.headers})
                .toPromise()
                .then(() => type)
                .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.typesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
	
}