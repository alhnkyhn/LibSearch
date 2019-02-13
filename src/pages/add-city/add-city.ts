import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { City } from '../../model/city.interface';
import { AngularFireDatabase , AngularFireList } from "angularfire2/database"; 
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-add-city',
  templateUrl: 'add-city.html',
})
export class AddCityPage {

	indexOfCity = {} as City;

  indexOfCityRef$: AngularFireList<City>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private toastCtrl: ToastController 
    ) {
  	this.indexOfCityRef$ = this.database.list('Cities/');
    this.indexOfCity.nameOfCity = "";
  }
 
   addCity(indexOfCity:City) {
     if(indexOfCity.nameOfCity.length >1){
    this.indexOfCityRef$.push({
    			nameOfCity : this.indexOfCity.nameOfCity,
  		});

  	this.indexOfCity= {} as City;

  	this.navCtrl.pop();

    this.sendSuccessNotification();
  }else {
    this.sendFailureNotification();
  }
  }
  sendSuccessNotification() {
    let toast = this.toastCtrl.create({
      message: 'Şehir ekleme başarılı!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
}

sendFailureNotification() {
  let toast = this.toastCtrl.create({
    message: 'Lütfen bir şehir ismi girin!',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
