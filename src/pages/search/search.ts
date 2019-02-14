import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Observable } from "rxjs";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  valueOfEmail: string;
  typeOfSearch: any;
  canSelectCity: boolean;
  canSelectLibrary : boolean;
  canSelectTypeOfWork : boolean;
  searchByName: boolean;
  didAddBefore: boolean;

  temp : string;
  temp2 : string;
  libraries = [];
  cities = [];
  codeOfLibraries = [];
  result = [];
  nameOfBooks=[];
  resultOfSearch=[];
  handmadeRef$: Observable<any>;

  searchTerm: string = '';
  items: any;
  searchControl: FormControl;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private database: AngularFireDatabase
    
    ) {
      this.valueOfEmail = navParams.get('eMail');
      this.handmadeRef$ = database.list('Temp/').valueChanges();
  }

  search(stringToSearch){
    this.resultOfSearch = [];
    this.didAddBefore=false;
    console.log("buraya gelen : " + stringToSearch);
    this.database.list('Temp/').valueChanges().subscribe((data) => {
       for(let item of data){
         this.temp = item.nameOfBook.toLowerCase();
         this.temp = this.temp.split(' ').join('');
         console.log(this.temp);

         this.temp2 = stringToSearch.toLowerCase();
         this.temp2 = this.temp2.split(' ').join('');

         console.log(this.temp.search(this.temp2));
         for(var i=0; i<this.resultOfSearch.length;i++){
           if(this.resultOfSearch[i]===item.nameOfBook){
             this.didAddBefore=true;
           }else{

           }
         }

         if(this.didAddBefore==false){
           if(this.temp.startsWith(this.temp2) == true || this.temp.endsWith(this.temp2) == true){
             console.log("burayaGeldi")
             this.resultOfSearch.push(this.temp);

           }else if(this.temp2.length>3){
             if(this.temp.search(this.temp2).valueOf()> (-1) ){
               this.resultOfSearch.push(this.temp);    
             }
             
           }         
         }
       }
       console.log(this.resultOfSearch)
     });

  }

  listToBooks(typeOfSearch){
  	console.log(typeOfSearch)

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
  		console.log("kk")
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
    										console.log("sa"+returnValue)
    										console.log("also: " +child3.val().nameOfWork)
    										console.log("second also : " + child3.val().nameOfWriter)
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
    									console.log(child3.val().IDofBook.substring(0,3))
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
    									console.log(child3.val().IDofPublisher.substring(0,3))
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
    									console.log("Uh! Seems like a t here is a mistake!")
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

  	console.log("geldii : " + tempValue)

  	this.result =this.result + this.getCity(tempValue);
  	console.log(this.result);
  	
  }

  getLink(value){

  		return "http://www.barcodes4.me/barcode/i2of5/"+value+".jpg?width=200&height=100"
  }

  deneme(value){
  	return "http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl="+value+"&chld=H|0"
  }

}
