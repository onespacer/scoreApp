import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {APIService} from './api.service';
import "rxjs/add/operator/map";

@Injectable()
export class AnalysisService{
    static analysisURL:string = APIService.baseurl + '/url/URLGetCombinedData';

    constructor(private http: Http){
        //console.log('Sentiment service initialized');
        //console.log('Setiment url is:' + SentimentService.setimentURL);
    }

    getAnalysisByUrl(factURL:string){
         //console.log("beginning of a service call..");
        var queryParams = "apikey=" + APIService.apikey + "&url=" +factURL + 
        "&extract=pub-date,title,doc-emotion,entities,keywords,taxonomy,doc-sentiment" + "&outputMode=json";
        return this.http.post(AnalysisService.analysisURL + "?" + queryParams, null)
                    .map(res => res.json());
    }
}
