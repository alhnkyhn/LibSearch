import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";


@IonicPage()
@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage {

	valueOfEmail : string;
    loanInfRef$: Observable<any>;
	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
  		private database: AngularFireDatabase,

		) {
	    this.loanInfRef$ = database.list('Temp3/').valueChanges();
	    this.valueOfEmail = navParams.get('eMail');
	    firebase.database().ref('Temp3/').remove();
	    
	    	firebase.database().ref('Loans/').orderByChild('IDofUser').once('value').then(snapshot => {
    			snapshot.forEach(function(child) {
    				firebase.database().ref('Loans/'+child.key+'/').orderByChild('IDofUser').once('value').then(snapshot => {
    					snapshot.forEach(function(child1) {
    						
									var cityCode = child1.val().IDofBook.substring(0,3);
									var libraryCode = child1.val().IDofBook.substring(3,6);
									var typeOfBook = child1.val().IDofBook.substring(6,9);
									console.log("asfa:" + typeOfBook)
									firebase.database().ref('Works/'+cityCode + '/' + libraryCode + '/' + typeOfBook +'/').orderByChild('IDofUser').once('value').then(snapshot => {
    									snapshot.forEach(function(child2) {
									
										
											if(child2.val().IDofBook == child2.val().IDofBook && typeOfBook =="002"){
												firebase.database().ref('Temp3/').push({
				    							IDofBook : child1.val().IDofBook,
				    							nameOfBook : child2.val().nameOfBook,
				    							nameOfWriter: child2.val().nameOfWriter,
				    							email : child1.val().emailOfUser,
				    							lastDayOfLoan : child1.val().lastDayOfLoan,
				    						});
											}else if(child2.val().IDofBook == child2.val().IDofBook && typeOfBook =="001"){
												firebase.database().ref('Temp3/').push({
				    							IDofBook : child1.val().IDofBook,
				    							nameOfBook : child2.val().nameOfWork,
				    							nameOfWriter: child2.val().writerOfWork,
				    							email : child1.val().emailOfUser,
				    							lastDayOfLoan : child1.val().lastDayOfLoan,
				    						});
											}else if(child2.val().IDofBook == child2.val().IDofBook && typeOfBook =="003"){
												firebase.database().ref('Temp3/').push({
				    							IDofBook : child1.val().IDofBook,
				    							nameOfWriter : child2.val().nameOfPublisher,
				    							nameOfBook: child2.val().nameOfPublishing,
				    							numberOfPublishing: child2.val().numberOfPublishing,
				    							email : child1.val().emailOfUser,
				    							lastDayOfLoan : child1.val().lastDayOfLoan,
				    						});
											}else{
												console.log("there is a mistake in loants")	
											}
										
									});
									});

									

								});
								
							});
    						
						}); 
    				});


		}

}
