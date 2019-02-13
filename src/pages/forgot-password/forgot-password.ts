import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserOfMine } from '../../model/user.interface';

import { LoginPage } from '../login/login';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

	userOfMine = {} as UserOfMine;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams

  	) {
  }

  resetPassword() {

	
    var auth = firebase.auth();
    if(this.userOfMine.email==null){
    		return;
    	}else{
    		return auth.sendPasswordResetEmail(this.userOfMine.email)
      			.then(() => this.navCtrl.setRoot(LoginPage) 
      			)
      			.catch((error) => console.log("hata var")
      				);
    			
    	}

}

}
