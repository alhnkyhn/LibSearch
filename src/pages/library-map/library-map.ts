import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import {GoogleMapComponent} from '../../components/google-map/google-map';
import {DisplayMapComponent} from '../../components/display-map/display-map';


@IonicPage()
@Component({
  selector: 'page-library-map',
  templateUrl: 'library-map.html',
})
export class LibraryMapPage {
  values: Observable<any>;
  array = [];
  arrayToShow = [];
  arrayToShowID = [];
  i = 0;
  j = 0;
  valueOfEmail : any;
  showIt :boolean;
  dontShowIt :boolean;
  
  
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
	private database: AngularFireDatabase,
  	private event: Events

  	) {
  	this.showIt = true;
  	this.dontShowIt = false;
  	this.values = this.database.list('Applications/').valueChanges();
    this.valueOfEmail = navParams.get('eMail');


  	this.database.list('Libraries/').valueChanges().subscribe((data) => {

   		for(let item of data){
   			this.array[this.i]=item.IDofLibrary;
   			this.i++;
		}
   		for(var k = 0; k< this.array.length;k++){
   			this.database.list('Applications/'+ this.array[k]+'/').valueChanges().subscribe((data) => {
   					for(let item of data){

   						if(item.Email == this.valueOfEmail){
   							if(item.canBeRezerve == 'true'){
   								this.arrayToShow.push(item.whichLibrary+item.nameOfLibrary);

   							}else{}
   						}else{}
             		}		
   				
   			});
		}
	});    
	}

	longitude : string;
	latitude : string;
	getLocation(IDofLibrary){
		console.log("Ben geldum" + IDofLibrary +" ---");
    this.event.publish('init',"555215");
		this.showIt = false;
		this.dontShowIt = true;
  		this.database.list('Locations/').valueChanges().subscribe((data) => {
  		for(let item of data){
  			if(item.IDofLibrary== IDofLibrary){
  				this.latitude = item.latitude;
  				this.longitude = item.longitude;
  				
  			}
  		}
  	});

	}


}
