import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class APIService{
    static apikey: string = "0a002de1ec6aeb58949e63178e437db1f4767e51";
    static baseurl: string = "https://gateway-a.watsonplatform.net/calls";
    
    constructor(private http: Http){
        console.log('API Service initialized');
    }
}
