import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 

import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
	temp$ : Observable<any[]>;

    items = [];

    constructor(
    	private database: AngularFireDatabase,
    	) {
  	  this.database.list('Temp/').valueChanges().subscribe((data) => {
  	  	for(let item of data){
  	  		this.items.push(item.nameOfBook);
  	  	}
  	  	console.log("Değer : " + this.items);

  	  });


        this.items = [
            {title: 'one'},
            {title: 'two'},
            {title: 'three'},
            {title: 'four'},
            {title: 'five'},
            {title: 'six'}
        ]

    }

    filterItems(searchTerm){

        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     

    }

}