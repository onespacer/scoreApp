import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class UtilityService{
    
    constructor(private http: Http){
        console.log('API Service initialized');
    }

    static monogoConString: string = 'mongodb://localhost/todoAppTest';
    
    savetoDB(){
        /*mongoose.connect(UtilityService.monogoConString);
        var TodoSchema = new mongoose.Schema({
                            name: String,
                            completed: Boolean,
                            note: String,
                            updated_at: { type: Date, default: Date.now },
                            });
        
        var Todo = mongoose.model('Todo', TodoSchema);
        
        var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});

        todo.save(function(err){
            if(err)
                console.log(err);
            else
                console.log(todo);
        });*/
    }
}
