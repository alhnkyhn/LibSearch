import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { Book } from '../../model/book.interface';
import { AddCityPage } from '../add-city/add-city';
import { AddLibraryPage } from '../add-library/add-library';
import { AddBook2Page } from '../add-book2/add-book2';
import { AdminPage } from '../admin/admin';
import { AcceptPage} from '../accept/accept';

@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
})

export class AddBookPage {
  value:any;
  nameOfLibrary:string;

	constructor(
	  	public navCtrl: NavController,
	  	public navParams: NavParams,
	  	private database: AngularFireDatabase,
      private toastCtrl: ToastController 
	  	) {
      
     this.value = navParams.get('IDofLibrary');

     this.database.list('Libraries/').valueChanges().subscribe((data) => { 
       for(let item of data){
         if(item.IDofLibrary== this.value){
           this.nameOfLibrary = item.nameOfLibrary;
         }
       }
     });
     
		}

    navigateToAddLibraryPage(){
    	this.navCtrl.push(AddLibraryPage);
    }

    navigateToAddBook2(){

      this.navCtrl.push(AddBook2Page , {
        value:this.value
      });
      
    }


  navigateToAcceptPage(){

    this.navCtrl.push(AcceptPage , {
      IDofLibrary : this.value
    });
    
  }

}
