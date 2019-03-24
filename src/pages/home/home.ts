import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Book } from '../../model/book.interface';
import { ApplicationPage } from '../application/application';
import { SearchPage } from '../search/search';
import { ApplicationDetailPage } from '../application-detail/application-detail';
import { LoanPage } from '../loan/loan';
import { IntroPage } from '../intro/intro';
import { LibraryMapPage } from '../library-map/library-map';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	indexOfBook = {} as Book;
	getBookRef$: AngularFireList<any>
	temp$ : Observable<any[]>;
	getCityNameRef$ : Observable<any>
  tempLibInfo = {} as string;
	libInfo = [];
  another: Observable<any>;
  valueOfEmail:string;
  valueOfPassword:string;
  temp : any;
  temp1 : any;

  	constructor(public navCtrl: NavController,
  			  private database: AngularFireDatabase,
          private navParams: NavParams
	) {
  		
      this.getCityNameRef$ = this.database.list('Cities/').valueChanges();
  	  this.getBookRef$ = this.database.list('Books/');
  	  this.another = this.database.list('Books/').valueChanges();
      this.valueOfEmail = navParams.get('eMail');
      this.valueOfPassword = navParams.get('password');
      if(this.valueOfEmail){
        this.temp  = this.valueOfEmail.search('@');
        this.temp1 = this.valueOfEmail.substring(0,this.temp);
      }
  	}

    navigateToApplicationPage(){
      this.navCtrl.push(ApplicationPage , {
        eMail : this.valueOfEmail,
        password: this.valueOfPassword
      })
    }

    navigateToApplicationDetailPage(){

      this.navCtrl.push(ApplicationDetailPage , {
        eMail : this.valueOfEmail
      });

    }

    navigateToSearchPage(){

      this.navCtrl.push(SearchPage ,{
        eMail : this.valueOfEmail
      })

    }

    navigateToLoanPage(){
      this.navCtrl.push(LoanPage , {
        eMail : this.valueOfEmail
      });
    }

    navigateToLibraryMapPage(){
      this.navCtrl.push(LibraryMapPage);
    }

    logOut(){
      firebase.auth().signOut().then(
        () => this.navCtrl.setRoot(IntroPage)
        );
      this.valueOfEmail = "";
    }


}
