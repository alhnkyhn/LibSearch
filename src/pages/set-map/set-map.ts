import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import {GoogleMapComponent} from '../../components/google-map/google-map';
import {AddBookPage} from '../add-book/add-book';
@IonicPage()
@Component({
  selector: 'page-set-map',
  templateUrl: 'set-map.html',
})
export class SetMapPage {
  value:any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private event: Events
	) {
     this.value = navParams.get('IDofLibrary');

  }
  ionViewDidLoad(){
    this.event.publish('IDofLibrary' , this.value);
  }

  save(){
  	this.event.publish('save' , this.value);
  	this.navCtrl.setRoot(AddBookPage,{
  		IDofLibrary:this.value
  	});
  }

  }

