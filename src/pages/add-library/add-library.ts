import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { GetLibrary } from '../../model/get-library.interface';
import { AddCityPage } from '../add-city/add-city';
import { AddBookPage } from '../add-book/add-book';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-add-library',
  templateUrl: 'add-library.html',
})
export class AddLibraryPage {

	indexOfLibrary = {} as GetLibrary;
  indexOfLibraryRef$: AngularFireList<GetLibrary>  
  getCityNameRef$: Observable<any>;
	getLibraryRef$: Observable<any>;

  temp :string;
  result :string;
  cityInfo :string;
  libraryInfo:string;
  passwordInfo:string;
  counter : string;
  isFirstTime:boolean;
  enBuyuk = [];
  saved: boolean;
  anyOtherLibrary: boolean;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private database: AngularFireDatabase,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController
  	) {
  	this.indexOfLibraryRef$ = this.database.list('Libraries/');
    this.getCityNameRef$ = this.database.list('Cities/').valueChanges();
    this.indexOfLibrary.nameOfLibrary = "";
    
   
    this.temp= "001";
    this.result = "";
    this.cityInfo = "";
    this.libraryInfo = "";
    this.counter = "0";
    this.isFirstTime=true;
    this.anyOtherLibrary=false;
    this.saved=false;

  }


  addLibrary(indexOfLibrary){
    this.saved = false;
    this.anyOtherLibrary=false;
    this.cityInfo = this.indexOfLibrary.nameOfCity;
    this.libraryInfo = this.indexOfLibrary.nameOfLibrary;
    this.passwordInfo = this.indexOfLibrary.passwordOfLibrary;

    this.database.list('Libraries/').valueChanges().subscribe((data) => {

      for (let cityInfos of data) {
        console.log(cityInfos.nameOfCity+"-------"+this.cityInfo)
        if(cityInfos.nameOfCity==this.cityInfo){
          this.anyOtherLibrary=true;
        }else{}
      }
      console.log("Is there another Library?= " + this.anyOtherLibrary)


      if(this.anyOtherLibrary==false){

        this.result="001";
        this.anyOtherLibrary=true;
        console.log("İlk defa kaydedildi mi ? : " +  this.saved);
      }else if(this.anyOtherLibrary==true && this.saved == false){ // Eğer ilk defa kaydedilmiyorsa
        for (let item of data) {
          console.log("item.nameOfCity  =" + item.nameOfCity + "this.cityInfo="+this.cityInfo);
          if(item.nameOfCity == this.cityInfo){
            this.temp=item.IDofLibrary.substring(3,6);
            

            if(this.temp==""){
              this.temp="000";
            }

            if(isNaN(parseInt(this.enBuyuk[parseInt(this.cityInfo)]))==true){
              this.enBuyuk[parseInt(this.cityInfo)]="000";
            }

            if(parseInt(this.temp)>parseInt(this.enBuyuk[parseInt(this.cityInfo)])){
               this.enBuyuk[parseInt(this.cityInfo)] =this.temp;
               console.log("EnBuyuk Bilgisi :" +this.enBuyuk);
            }else{}
          }
        }
      

      if(parseInt(this.enBuyuk[parseInt(this.cityInfo)]).toString().length ==1){
                    this.result = "00"+(parseInt(this.enBuyuk[parseInt(this.cityInfo)])+1);
                  }else if(parseInt(this.enBuyuk[parseInt(this.cityInfo)]).toString().length ==2){
                     this.result = "0"+(parseInt(this.enBuyuk[parseInt(this.cityInfo)])+1);
                  }else if(parseInt(this.enBuyuk[parseInt(this.cityInfo)]).toString().length ==3){
                     this.result = ""+(parseInt(this.enBuyuk[parseInt(this.cityInfo)])+1);
          }else{}
          console.log("Oluşan result değeri : " + this.result);
    }else{}

    if(this.saved == false){
     this.indexOfLibraryRef$.push({
            nameOfCity : this.cityInfo,
            nameOfLibrary : this.libraryInfo,
            IDofLibrary : this.cityInfo+this.result,
            passwordOfLibrary : this.passwordInfo
          });

      this.saved = true;
    

    const alert = this.alertCtrl.create({
      title: 'Dikkat!',
      subTitle: 'Kütüphane başarı ile kayıt edildi.\nKullanıcı Adı : ' + this.cityInfo+this.result + '\nŞifre:'+this.passwordInfo,
      buttons: ['Tamam']
    });
    alert.present();
  }
    this.indexOfLibrary= {} as GetLibrary;
    this.navCtrl.setRoot(AddBookPage, {
      IDofLibrary : this.cityInfo+this.result
    });

    });


}
    
  

  navigateToAddCityPage(){
    this.navCtrl.push(AddCityPage);
  }

  sendSuccessNotification() {
    let toast = this.toastCtrl.create({
    message: 'Kütüphane ekleme başarılı!',
    duration: 3000,
    position: 'top'
    });
    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  sendFailureNotification() {
    let toast = this.toastCtrl.create({
      message: 'Lütfen bir kütüphane ismi girin!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
    }


  alertOfInformation() {
  const alert = this.alertCtrl.create({
      title: 'Bilgi',
      subTitle: 'Her kütüphanenin kendine özgü bir arayüzü olacağından dolayı bir kütüphane arayüzüne erişim şifresi oluşturmanız gerekmekte!',
      buttons: ['Tamam']
    });
    alert.present();
  }

}


  
