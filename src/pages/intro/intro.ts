import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { LoginPage } from '../login/login';
import { UserOfMine } from '../../model/user.interface';
import { LibraryPage } from '../library/library';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

 
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private database: AngularFireDatabase,
  	) {

  }

  ionViewDidLoad() {
  }

  navigateToUserPage(){
  	this.navCtrl.push(LoginPage);
  }

  navigateToLibraryPage(){
  	this.navCtrl.push(LibraryPage);
  }

}
