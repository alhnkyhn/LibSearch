import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { UserInformation } from '../../model/UserInformations.interface';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-application',
  templateUrl: 'application.html',
})

export class ApplicationPage {
	valueOfEmail : string;
	valueOfPassword : string;
	canFormBeView : boolean;
	preInformation : boolean;
	valueOfCity : any ;
	values: Observable<any>;
	selectedLibrary : string;
	selectedLibrarysName : string;
	isCitySelected : boolean;
	closeToCards : boolean;
	canBeReserve : boolean;

	indexOfUserRef$: AngularFireList<UserInformation>  
	indexOfUser = {} as UserInformation;


  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
	  		  private database: AngularFireDatabase,
	  		  public toastCtrl: ToastController,
	  		  public alertCtrl: AlertController
  			  ) {
  	this.valueOfEmail = navParams.get('eMail');
  	this.valueOfPassword = navParams.get('password');  
  	this.canFormBeView = false;
  	this.preInformation = true;
  	this.selectedLibrary ="";
  	this.isCitySelected = false;
  	this.closeToCards = true;
  }

  setPreInftoFalse(){
  	console.log("geldi");
  	this.preInformation = false;
  	this.canFormBeView=true;

  }

  getCity(){
  	console.log( + this.valueOfCity)
  	this.values = this.database.list('Libraries/').valueChanges();
  	this.isCitySelected = true;
  }

  whichLibrary(value , value2){
  	this.selectedLibrary = value;
  	this.selectedLibrarysName=value2;
  	const toast = this.toastCtrl.create({
      message: value2 + ' Kütüphanesi seçildi',
      duration: 3000,
      position : 'top'
    });
    toast.present();
  	this.closeToCards=false;
  }

  doApplication(indexOfUser){
  	this.canBeReserve = false;
  	this.indexOfUserRef$ = this.database.list('Applications/' + this.selectedLibrary + '/');

  	this.indexOfUserRef$.push({
            Email : this.valueOfEmail,
            IDofUser : this.indexOfUser.IDofUser ,
            nameOfUser : this.indexOfUser.nameOfUser,
            lastnameOfUser : this.indexOfUser.lastnameOfUser,
            whichLibrary : this.selectedLibrary,
            nameOfLibrary : this.selectedLibrarysName,
            dateOfBorn : this.indexOfUser.dateOfBorn,
            canBeRezerve : 'false',
    });

    
    const alert = this.alertCtrl.create({
      title: 'Başvuru Başarılı!',
      subTitle: 'Artık başvuru yaptığınız kütüphanedeki uygun kitapları görebilirsiniz!',
      buttons: ['OK']
    });
    alert.present();

    this.navCtrl.setRoot(HomePage,{
          eMail: this.valueOfEmail
        });

  }


  
  }
