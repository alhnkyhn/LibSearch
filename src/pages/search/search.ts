import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Observable } from "rxjs";
import { FormControl } from '@angular/forms';
import { Loan } from '../../model/loan.interface';
import { HomePage } from '../home/home';
import { LoanPage } from '../loan/loan';


import 'rxjs/add/operator/debounceTime';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  once : boolean;
  valueOfEmail: string;
  typeOfSearch: any;
  canSelectCity: boolean;
  canSelectLibrary : boolean;
  canSelectTypeOfWork : boolean;
  searchByName: boolean;
  didAddBefore: boolean;
  IDofLibrary : string;
  temp : string;
  temp2 : string;
  libraries = [];
  cities = [];
  codeOfLibraries = [];
  result = [];
  nameOfBooks=[];
  resultOfSearch=[];
  books=[];
  handmadeRef$: Observable<any>;
  searchResultTemp$: Observable<any>;
  searchResult$: Observable<any>;
  loanInfRef$: Observable<Loan>;
  emailControl : boolean;
  reserveControl : boolean;
  counter : any;
  searchTerm: string = '';
  items: any;
  searchControl: FormControl;
  took : boolean;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private database: AngularFireDatabase,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    ) {
      this.valueOfEmail = navParams.get('eMail');
      this.handmadeRef$ = database.list('Temp/').valueChanges();
      this.searchResult$ = database.list('Temp4/').valueChanges();
      this.took = false;
/*    
      if(this.searchResult$){
        this.searchResultTemp$ = this.searchResult$;
      }else{
        this.searchResultTemp$= null;
      }
      */
  }

  search(stringToSearch){
    this.resultOfSearch = [];
    this.didAddBefore=false;
    if(stringToSearch.length<3){
      this.database.list('Temp4/').remove();
    }
    this.database.list('Temp/').valueChanges().subscribe((data) => {
       for(let item of data){
         this.temp = item.nameOfBook.toLowerCase();
         this.temp = this.temp.split(' ').join('');
         
         this.temp2 = stringToSearch.toLowerCase();
         this.temp2 = this.temp2.split(' ').join('');

         
         for(var i=0; i<this.resultOfSearch.length;i++){
           if(this.resultOfSearch[i]===item.nameOfBook){
             this.didAddBefore=true;
           }else{

           }
         }

         if(this.didAddBefore==false){
           if(this.temp2.length>2){
             if(this.temp.search(this.temp2).valueOf()> (-1) ){
               if(item.typeOf==='001'){

                 this.database.list('Temp4/').remove();
                 this.database.list('Temp4/').push({
                    typeOf :item.typeOf,
                    IDofBook : item.IDofBook,
                    nameOfBook : item.nameOfBook,
                    nameOfWriter : item.nameOfWriter,
                    canBeShow : item.canBeShow,
                    canBeTake : item.canBeTake,
                    languageOfWork: item.languageOfWork,
                    translatorOfWork: item.translatorOfWork,
                    dateOfWork: item.dateOfWork
                 });
               }else if(item.typeOf==='002'){

                 this.database.list('Temp4/').remove();
                 this.database.list('Temp4/').push({
                    typeOf :item.typeOf,
                    IDofBook : item.IDofBook,
                    nameOfBook : item.nameOfBook,
                    nameOfWriter : item.nameOfWriter,
                    canBeShow : item.canBeShow,
                    canBeTake : item.canBeTake,
                    languageOfBook: item.languageOfBook,
                    translatorOfBook: item.translatorOfBook,
                    dateOfBook: item.dateOfBook
                 });
               }else if(item.typeOf==='003'){

                 this.database.list('Temp4/').remove();
                 this.database.list('Temp4/').push({
                    typeOf :item.typeOf,
                    number:item.number,
                    IDofBook : item.IDofBook,
                    nameOfBook : item.nameOfBook,
                    nameOfWriter : item.nameOfWriter,
                    canBeShow : item.canBeShow,
                    canBeTake : item.canBeTake,
                    languageOfBook: item.languageOfBook,
                    translatorOfBook: item.translatorOfBook,
                    dateOfBook: item.dateOfBook
                 });
               }        
             }

           }         
         }
       }
     });


  }

  listToBooks(typeOfSearch){

  	if (typeOfSearch === "0") { 

  		this.canSelectCity = true;
      this.canSelectLibrary = false;
      this.searchByName = true;
      this.canSelectTypeOfWork = false;

  	} else if(typeOfSearch === "1") {

  		this.canSelectCity = false;
      this.canSelectLibrary = true;
      this.searchByName = false;
      this.canSelectTypeOfWork = false;

  	} else if (typeOfSearch === "2") {

  		this.canSelectCity = false;
      this.canSelectLibrary = false;
      this.canSelectTypeOfWork = true;
      this.searchByName = false;

    }else{
  	}


  }

 public getCity(nameOfCity): any{
 	firebase.database().ref('Temp/').remove();
  	firebase.database().ref('Works/').orderByChild('IDofUser').once('value').then(snapshot => {
    	snapshot.forEach(function(child) {

    		firebase.database().ref('Works/'+child.key+'/').orderByChild('IDofUser').once('value').then(snapshot => {
    			snapshot.forEach(function(child1) {
    				firebase.database().ref('Works/'+child.key+'/'+child1.key+'/').orderByChild('IDofUser').once('value').then(snapshot => {
    					snapshot.forEach(function(child2) {
    						firebase.database().ref('Works/'+child.key+'/'+child1.key + '/'+child2.key +'/').orderByChild('IDofUser').once('value').then(snapshot => {
    							snapshot.forEach(function(child3) {
    								if(child2.key === "001"){
    									if(child3.val().IDofWork.substring(0,3) === nameOfCity){
    										var returnValue = child3.val().nameOfWork;
    										firebase.database().ref('Temp/').push({
    											typeOf :child2.key,
    											IDofBook : child3.val().IDofWork,
    											nameOfBook : returnValue,
    											nameOfWriter : child3.val().writerOfWork,
    											canBeShow : child3.val().canBeShow,
    											canBeTake : child3.val().canBeTake,
    											languageOfWork: child3.val().languageOfWork,
    											translatorOfWork: child3.val().translatorOfWork,
    											dateOfWork: child3.val().dateOfWork
    										});

    									}
    								}else if(child2.key === "002"){
    									if(child3.val().IDofBook.substring(0,3) === nameOfCity){
    									firebase.database().ref('Temp/').push({
    											IDofBook : child3.val().IDofBook,
    											nameOfBook : child3.val().nameOfBook,
    											nameOfWriter : child3.val().nameOfWriter,
    											languageOfBook : child3.val().languageOfBook,
    											dateOfBook : child3.val().dateOfBook,
    											canBeTake :  child3.val().canBeTake,
    											canBeShow:  child3.val().canBeShow,
    											translatorOfBook:child3.val().translatorOfBook,
    											typeOf:child2.key,
    											typeOfBook: child3.val().typeOfBook,
    											pageNumberOfBook:child3.val().pageNumberOfBook

    										});
    								}
    								}else if(child2.key === "003"){
    									if(child3.val().IDofPublisher.substring(0,3) === nameOfCity){
    									firebase.database().ref('Temp/').push({
    											IDofBook : child3.val().IDofPublisher,
    											nameOfBook : child3.val().nameOfPublishing,
    											number : child3.val().numberOfPublishing,
    											nameOfWriter : child3.val().nameOfPublisher,
    											dateOfBook : child3.val().dateOfPublishing,
    											canBeTake :  child3.val().canBeTake,
    											canBeShow:  child3.val().canBeShow,
    											translatorOfBook:child3.val().translatorOfPublishing,
    											typeOf:child2.key,

    										});
    								}
    								}else{
    									console.log("Uh! Seems like a there is a mistake!")
    								}
    							});
    						});
    					});
    				});
    			});
    		});
    	});
    });

  }

  getData(tempValue){
  	this.result =this.result + this.getCity(tempValue);
  }

  getLink(value){
  		return "http://www.barcodes4.me/barcode/i2of5/"+value+".jpg?width=200&height=100"
  }

  deneme(value){
  	return "http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl="+value+"&chld=H|0"
  }

  reserve(IDofBook){
    this.reserveControl = false;
    this.emailControl = false;
    this.IDofLibrary = IDofBook.substring(0,6)
    this.once=true;


    var today = new Date();
    var dd = today.getDate();
    dd = dd+15;
    var mm = today.getMonth() + 1;

    if(dd>30){
      dd = dd%30;
      dd++;
      mm++;
    }

    var yyyy = today.getFullYear();
    var dateOfLoan = mm + '/' + dd + '/' + yyyy;

    

    this.database.list('Applications/'+this.IDofLibrary+'/').valueChanges().subscribe((data) =>{
      this.counter=0;
      let cityPart = IDofBook.substring(0,3);
      let libraryPart = IDofBook.substring(3,6);
      let typePart = IDofBook.substring(6,9);
      let bookPart = IDofBook.substring(9,14);

      let ii = 0;
      for(let item of data){
        if(item.Email === this.valueOfEmail){
          this.emailControl = true;

          if(item.canBeRezerve=="true"){
            this.reserveControl = true;
          }
        }
      }
      this.database.list('Loans/'+cityPart+libraryPart+'/').valueChanges().subscribe((data3) =>{
        this.database.list('Temp/' ).valueChanges().subscribe((data2) =>{
      if(this.took == false){
          for(let item of data3){
            this.books[ii] = item.IDofBook;
            ii++;
          }
        
      if(this.once == true){
        if(this.emailControl == true && this.reserveControl == true){
          this.once = false;
          for (var i = 0; i <this.books.length; i++) {
            let temp= this.books[i];
            console.log(temp + " Karsilastirma " + IDofBook);
            if(temp == IDofBook){
            this.counter++;
            }else{}
          }
          if(this.counter==0){
          const confirm = this.alertCtrl.create({
            title: 'Rezervasyon yapmak istiyor musunuz?',
            message: 'Rezervasyon yaptığınız durumda 1 hafta içinde'
             +'kitabı kütüphaneden almanız gerekiyor aksi halde üyeliğiniz iptal olacak. <br>'+
             'Onaylıyor musunuz?',
            buttons: [
              {
                text: 'Onaylamıyorum',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Onaylıyorum',

                handler: () => {
                for(let item of data2){
                  if(item.IDofBook == IDofBook){
                  firebase.database().ref('Loans/' + this.IDofLibrary + '/').push({
                        emailOfUser: this.valueOfEmail,
                        IDofBook: IDofBook,
                        nameOfBook : item.nameOfBook,
                        nameOfWriter : item.nameOfWriter,
                        lastDayOfLoan:dateOfLoan,
                  });
                }
                }
                  const toast = this.toastCtrl.create({
                      message: 'Kitap ödünç alma işlemi tamamlandı.',
                      duration: 3000,
                      position: 'top'
                    });
                    toast.present();
                  this.navCtrl.setRoot(HomePage , {
                    eMail : this.valueOfEmail
                  });
                  this.took = true;
                  this.once = false;
                }
              }
            ]
          });
        confirm.present();
      }else{

        const confirm = this.alertCtrl.create({
           title: 'Rezervasyon yapılamaz',
           message: 'Bu kitap zaten rezervasyon yapılmış durumda' + 'Rezervasyon bitiş tarihi: '+dateOfLoan
        });
        confirm.present();


      }
        }else if(this.emailControl == true && this.reserveControl == false){
          this.once = false;
          const alert = this.alertCtrl.create({
              title: 'Üyelik',
              subTitle: 'Üyeliğiniz onaylanmadan rezervasyon işlemi yapamazsınız!',
              buttons: ['Tamam']
          });
          alert.present();
        }else if(this.emailControl==false){
          this.once = false;
          const alert = this.alertCtrl.create({
              title: 'Üyelik',
              subTitle: 'Kütüphaneye üye olmadan rezervasyon işlemi yapamazsınız!',
              buttons: ['Tamam']
            });
            alert.present();
          }else{
            this.once = false;
            console.log("Uh seems like a there is a problem in searchpage");
          }
        }
   }
    });    
    });
    });


  }

}
