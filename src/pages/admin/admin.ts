import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddBookPage} from '../add-book/add-book';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

	getBookRef$ : Observable<any>

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private database: AngularFireDatabase
  	) {

  	this.getBookRef$ = this.database.list('Books/').valueChanges();
  }
	
	navigateToAddBookPage(){

		this.navCtrl.push(AddBookPage);
	  
  }

}
