import { Component } from '@angular/core';
import {AnalysisService} from '../services/analysis.service';

@Component({
  selector: 'analysis',
  template: `
            <div>
                <h3>Fact Analysis:</h3>
                <table border="1" width="50%">
                    <tr>
                        <th>Fact</th>
                        <th>keywords</th>
                        <th>pub-date</th>
                        <th>title</th>
                        <th>doc-emotion</th>
                        <th>taxonomy</th>
                        <th>doc-sentiment</th>
                    </tr>
                    <tr *ngFor="let responseKVP of analyzedResponses; let i = index" >
                        <td id="url{{i}}">{{responseKVP.response.url}}</td>
                        <td>
                            <ul *ngFor="let keyword of responseKVP.response.keywords">
                                <li>{{keyword.text}}</li>
                            </ul>
                        </td>
                        <td><label>{{responseKVP.response.pub-date.date}}</label></td>
                        <td><label>{{responseKVP.response.title}}</label></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            `,
    providers: [AnalysisService],
})

export class AnalysisComponent  { 

    analyzedResponses: analyzedResponse[];
    analysisService: AnalysisService;

    constructor(private anaService: AnalysisService){
        this.analysisService = anaService;
    }

    analyze(factURL:string){
        if(factURL != null && factURL != ""){
            this.analysisService.getAnalysisByUrl(factURL).subscribe(response => { 
                var analyzedResponse:analyzedResponse;
                analyzedResponse.url = factURL;
                analyzedResponse.response = response;
                console.log("Response: " + analyzedResponse.response);
                this.analyzedResponses.push(analyzedResponse);       
            });
        }else{
           console.log("source/url cannot be empty");
        }
    }
}

interface analyzedResponse{
    url:string;
    response:analysisMapper;
}


interface analysisMapper{
    "url":string;
    "totalTransactions":number;
    "language":string;
    "keywords":keyword[];
    "entities":entity[];
    "pub-date":pubdate;
    "title":string;
    "doc-emotion":emotion;
    "taxonomy":taxonomy[];
    "doc-sentiment":sentiment;
}

interface sentiment{
    type:string;
    score:number;
}

interface emotion{
    anger:number;
    disgust:number;
    fear:number;
    joy:number;
    sadness:number;
}

interface keyword{
    text:string;
    relevance:number;
    sentiment:sentiment;
}

interface entity{
    type:string;
    relevance:number;
    sentiment:sentiment;
    count:number;
    text:string;
    emotions:emotion;
}

interface pubdate{
    confident:string;
    date:string;
}

interface taxonomy{
    confident:string;
    label:string;
    score:number;
}