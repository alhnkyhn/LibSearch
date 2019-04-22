import { Component, ViewChild} from '@angular/core';
import { Events, NavParams , ToastController} from 'ionic-angular';
import {GoogleMapComponent} from '../../components/google-map/google-map';

@Component({
  selector: 'display-map',
  templateUrl: 'display-map.html'
})
export class DisplayMapComponent {
  @ViewChild("map") mapElement;
  map: any;
  text: string;
  marker: any;

  constructor(
  	private event: Events,
  	) {
  	this.event.subscribe('' , () =>{
  		this.initMap();
  	});
  }
  
  initMap(){
  	let coords = new google.maps.LatLng(45,100);	
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

}
