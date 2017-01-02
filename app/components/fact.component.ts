import { Component } from '@angular/core';
import {AnalysisService} from '../services/analysis.service';

@Component({
  selector: 'fact',
  template: `
            <h2>Add Facts </h2>
            <form>
                <div>
                    <label><strong>Select a personality: </strong></label>
                    <select #personality name="personality">
                        <option>Arvind Kejriwal</option>
                        <option>Narendra Modi</option>
                        <option>Sachin Tendulkar</option>
                        <option>Hrithik Roshan</option>
                    </select>
                </div>
                <br />
                <div>
                    <label><strong>Fact Text:  </strong></label>
                    <textarea type="text" name="fact" #fact autosize style="width:40%;" ></textarea>
                </div>
                <br />
                <div>
                    <label><strong>Source (URL):  </strong></label>
                    <input type="text" name="source" #source style="width:40%;" />
                </div>
                <br />
                <div>
                    <button (click)="addFact(fact.value, source.value, personality.value)">add</button>
                </div>
            </form>
            <div>
                <h3>Fact Analysis:</h3>
                <table border="1">
                    <tr>
                        <th>Fact</th>
                        <th>keywords</th>
                        <th>publicationDate</th>
                        <th>title</th>
                        <th>docEmotions</th>
                        <th>taxonomy</th>
                        <th>docSentiment</th>
                    </tr>
                    <tr *ngFor="let responseKVP of analyzedResponses; let i = index" >
                        <td id="url{{i}}">{{responseKVP.response.url}}</td>
                        <td width="20%">
                            <span *ngFor="let keyword of responseKVP.response.keywords">{{keyword.text}}, </span>
                        </td>
                        <td><label *ngIf="responseKVP?.response?.publicationDate?.date">{{responseKVP.response.publicationDate.date}}</label></td>
                        <td><label *ngIf="responseKVP?.response?.title">{{responseKVP.response.title}}</label></td>
                        <td>{{responseKVP.response.docEmotions}}</td>
                        <td>{{responseKVP.response.taxonomy}}</td>
                        <td>{{responseKVP.response.docSentiment}}</td>
                    </tr>
                </table>
            </div>
            `,
            providers: [AnalysisService]
})

export class FactComponent  { 
    facts: fact[];
    analyzedResponses: analyzedResponse[];
    analysisService: AnalysisService;

    constructor(private anaService: AnalysisService){
        this.facts = [];
        this.analysisService = anaService;
        this.analyzedResponses = [];
    }

    addFact(factText:string, source:string, target:string){
        console.log(target);
        if(source != null && source != ""){
            this.analyze(source);
        }else{
           console.log("source cant be null");
        }
    }

    analyze(factURL:string){
        if(factURL != null && factURL != ""){
            this.analysisService.getAnalysisByUrl(factURL).subscribe(response => { 
                console.log("Response: " + response.totalTransactions);
                var analyzedResponse:analyzedResponse = {url:factURL, response:null};
                analyzedResponse.response = response;
                console.log("Response: " + analyzedResponse.response);
                this.analyzedResponses.push(analyzedResponse);       
            });
        }else{
           console.log("source/url cannot be empty");
        }
    }
}

interface fact{
    id:  number;
    text: string;
    source: string;
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
    "publicationDate":pubdate;
    "title":string;
    "docEmotions":emotion;
    "taxonomy":taxonomy[];
    "docSentiment":sentiment;
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