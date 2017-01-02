import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {APIService} from './api.service';
import "rxjs/add/operator/map";

@Injectable()
export class SentimentService{
    static setimentURL:string = APIService.baseurl + '/text/TextGetTextSentiment';

    constructor(private http: Http){
        //console.log('Sentiment service initialized');
        //console.log('Setiment url is:' + SentimentService.setimentURL);
    }

    getSentimentByText(factText:string){
        //console.log("beginning of a service call..");
        var queryParams = "apikey=" + APIService.apikey + "&text=" +factText + "&outputMode=json" ;
        return this.http.post(SentimentService.setimentURL + "?" + queryParams, null)
                    .map(res => res.json());
    }

    getSentimentByUrl(factURL:string, target:string){
         //console.log("beginning of a service call..");
        var queryParams = "apikey=" + APIService.apikey + "&html=" +factURL + "&targets=" + target + "&outputMode=json" + "&sourceText=cleaned_or_raw";
        return this.http.post(SentimentService.setimentURL + "?" + queryParams, null)
                    .map(res => res.json());
    }
}
