import { Component, ViewChild} from '@angular/core';
import { Events, NavParams , ToastController} from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 

import * as firebase from 'firebase/app';


@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  @ViewChild("map") mapElement;
  map: any;
  marker: any;
  value:any;
  ID : any;
  lat : number;
  lng : number;
  constructor(
  	private event: Events,
	private database: AngularFireDatabase,
	private navParams: NavParams,
	private toaster : ToastController
  	) {
  	this.event.subscribe('save' , (IDofLibrary) =>{
      this.save(IDofLibrary);
  	});
  	
  
  }

  ngOnInit(){
  	this.event.subscribe('IDofLibrary',(ID)=>{
  		this.ID=ID;
  	});
  	this.initMap();
  }

  initMap(){
    this.lat = 0;
    this.lng = 0;
  	var counter =0;
  	this.database.list("Locations/").valueChanges().subscribe((data) => {
  		for(let item of data){
  			console.log(item.IDofLibrary+ " --- " +this.ID);
  			if(item.IDofLibrary == this.ID){
  				this.lat = item.Latitude;
  				this.lng = item.Longitude;
  				counter++;
  			}
  		}

  		if(counter == 0){
  			if(this.ID.substring(1,3)=="42"){
  				this.lat =37.864260;
  				this.lng =32.496155;
  			}
  		}
  	
  	
  	let coords = new google.maps.LatLng(this.lat,this.lng);
  	
  	let mapOptions: google.maps.MapOptions = {
  		center: coords,
  		zoom: 14,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	}
  	this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);

  	this.marker = new google.maps.Marker({
  		map: this.map,
	    position: coords,
	    draggable: true,
    	animation: google.maps.Animation.DROP
	  });
  	});
  }


  init(lt,ln){
    let coords = new google.maps.LatLng(lt,ln);
    
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);

    this.marker = new google.maps.Marker({
      map: this.map,
      position: coords,
      draggable: true,
      animation: google.maps.Animation.DROP
    });
    
  }

  save(IDofLibrary){
  	var lat = this.marker.getPosition().lat();
	var lng = this.marker.getPosition().lng();
    var counter = 0;
	const notification = this.toaster.create({
		message:'Konum başarıyla kaydedildi',
		duration: 4000,
		position:'top'		
	});

	firebase.database().ref('Locations/').orderByChild('IDofLibrary').once('value').then(snapshot => {
    	snapshot.forEach(function(child) {
    		if(child.val().IDofLibrary==IDofLibrary){
    			firebase.database().ref('Locations/'+child.key).update({
    				Latitude : lat,
					Longitude : lng
    			});
    			counter++;
    		}
    	});
    
    	if(counter==0){
    		this.database.list("Locations/").push({
    			IDofLibrary : IDofLibrary,
    			Latitude: lat,
    			Longitude: lng
    		});
    	}
	
	});
	notification.present();
  }

  

}
