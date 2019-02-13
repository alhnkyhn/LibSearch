import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { AlertController } from 'ionic-angular';
import { UserInformation } from '../../model/UserInformations.interface';
import * as firebase from 'firebase/app';
@IonicPage()
@Component({
  selector: 'page-accept',
  templateUrl: 'accept.html',
})
export class AcceptPage {
  values: Observable<any>;
  IDofLibrary : string;
  indexOfUserRef$: AngularFireList<UserInformation>  
  once :boolean;
  keyy : any;
  constructor(public navCtrl: NavController,
	  		  public database: AngularFireDatabase,
   			  public navParams: NavParams,
   			  public alertCtrl: AlertController
  	) {
     this.IDofLibrary = navParams.get('IDofLibrary');
     this.values = this.database.list('Applications/' + this.IDofLibrary + '/').valueChanges();
     this.keyy = "";
  }

  AcceptOrNot(input){
  	this.once = true;
  	const alert = this.alertCtrl.create({
      title: input.nameOfUser +' ' + input.lastnameOfUser + 'onaylansın mı?' ,
      
       buttons: [
        {
          text: 'Onayla',
          handler: data => {


        	this.database.list('Applications/' + this.IDofLibrary + '/').valueChanges().subscribe((data2) => {
          		for(let item2 of data2){
          			if(this.once == true){
          				console.log("Once bilgisi : " + this.once)
          				console.log(item2.IDofUser  +  " ----" + input.IDofUser)
          		 	  if(item2.IDofUser == input.IDofUser){
          					firebase.database().ref('Applications/' + this.IDofLibrary).orderByChild('IDofUser').equalTo(input.IDofUser)
  								.once('value').then(snapshot => {
    								snapshot.forEach(function(child) {
    								child.ref.remove();
    								});
								});
          				this.database.list('Applications/' + this.IDofLibrary + '/').push({
          					Email : item2.Email,
          					IDofUser : item2.IDofUser,
				            nameOfUser : item2.nameOfUser,
				            lastnameOfUser : item2.lastnameOfUser,
				            whichLibrary : item2.whichLibrary,
                    nameOfLibrary : item2.nameOfLibrary,
				            dateOfBorn : item2.dateOfBorn,
				            canBeRezerve : 'true',
          				});
                  
                  this.once = false;
          			  }
          			 item2 = {};
          			}
          		}
  })
          }
        },
        {
          text: 'Reddet',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
