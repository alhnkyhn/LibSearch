import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserOfMine } from '../../model/user.interface';
import { Observable } from 'rxjs/Observable';
import { AddBookPage } from '../add-book/add-book';
import { AddLibraryPage } from '../add-library/add-library';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 

/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {
	getLibraryRef$: Observable<any>;
	userOfMine = {} as UserOfMine;


  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private database: AngularFireDatabase
  	) {
  }

  tryToLogin(userOfMine : UserOfMine) {

  	this.database.list('Libraries/').valueChanges().subscribe((data) => {

  		for (let item of data ){
        
  			if(item.IDofLibrary == userOfMine.email){
  				if(item.passwordOfLibrary == userOfMine.password){
  					this.redirectToAddBookPage(userOfMine.email);
  				}
  			}

  		}

  	});

    if(userOfMine.email=="admin@admin"){
          if(userOfMine.password=="admin"){
            this.redirectToAdminPage();
          }
        }
  }

  redirectToAddBookPage(IDofLibrary){
  	console.log("Gönderilen ", IDofLibrary);
  	this.navCtrl.push(AddBookPage , {
  		IDofLibrary : IDofLibrary
  	});
  }

  redirectToAdminPage(){
    this.navCtrl.push(AddLibraryPage);
  }

}

