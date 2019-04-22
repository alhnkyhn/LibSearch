import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable'
import { Result } from '../../model/result.interface';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-application-detail',
  templateUrl: 'application-detail.html',
})
export class ApplicationDetailPage {
	valueOfEmail : any;
	values : Observable<any>;
	dataToPush : AngularFireList<Result>
	array = [];
	arrayWL = [];
	arrayR = [];
	result =[];
	i : any;
	j : any;

  constructor(
  	public navCtrl: NavController,
  	 public navParams: NavParams,
  	 public database : AngularFireDatabase

  	 ) {

      this.valueOfEmail = navParams.get('eMail');
      this.i = 0;
      this.j = 0;

	this.database.list('Libraries/')
   		.valueChanges().subscribe((data) => {

   			for(let item of data){
   				this.array[this.i]=item.IDofLibrary;
   				this.i++;
			}

   			
   			console.log(this.array.length)
   			for(var k = 0; k< this.array.length;k++){
   				console.log(this.array[k])
   			this.database.list('Applications/'+ this.array[k]+'/')
   				.valueChanges().subscribe((data) => {
   					for(let item of data){
   						console.log(item.Email + "asda"+this.valueOfEmail )

   						if(item.Email === this.valueOfEmail){
   							if(item.canBeRezerve == 'true'){
   								this.result[this.j] =  item.nameOfLibrary +" Kütüphanesine başvuru durumunuz: Başvurunuz Onaylandı"
   							}else{
   								this.result[this.j] =  item.nameOfLibrary +" Kütüphanesine başvuru durumunuz: Başvurunuz henüz onaylanmadı"
   							}
   					  this.j ++;
               }else{

               }
             }
   				
   		
   				});

   			}

   		
   		});    

   		
   		
   		
  }
}
