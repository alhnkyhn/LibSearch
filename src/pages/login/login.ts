import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserOfMine } from '../../model/user.interface';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AdminPage } from '../admin/admin';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	userOfMine = {} as UserOfMine;

	loginError: string;

  	
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
		  public afAuth: AngularFireAuth,
      private database: AngularFireDatabase
  		) {
  	}

  	tryToLogin(userOfMine : UserOfMine) {
  		if(this.userOfMine.email==="admin@admin.com" && this.userOfMine.password==="admin123"){
  				this.navCtrl.setRoot(AdminPage);
  		}else{

	  		this.afAuth.auth.signInWithEmailAndPassword(userOfMine.email,
				userOfMine.password).then(
				() =>this.navCtrl.setRoot(HomePage,{
          eMail: this.userOfMine.email,
          password : this.userOfMine.password
        }),
				error => this.loginError = error.message
				);
			console.log(this.loginError);
  	    }

        


  	}

  	forgotPassword(){

  		this.navCtrl.push(ForgotPasswordPage);
  	
  	}

  	signup(){

  		this.navCtrl.push(SignupPage);
    }



}
