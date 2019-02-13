import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { UserOfMine } from '../../model/user.interface';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	signupError: string;

	userOfMine = {} as UserOfMine;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public afAuth: AngularFireAuth
  		) {
  	
  	}

  	signUp(){
  		
  		this.afAuth.auth.createUserWithEmailAndPassword(this.userOfMine.email, this.userOfMine.password).then(
			() => this.navCtrl.setRoot(HomePage),
			error => this.signupError = error.message
			);
  		
  	}

  	alreadyMember(){

  		this.navCtrl.setRoot(LoginPage);
  	}



  

}
