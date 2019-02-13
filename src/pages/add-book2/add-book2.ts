
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HandmadeWork } from '../../model/handmade.interface';
import { Book2 } from '../../model/book2.interface';
import { AddBookPage } from '../../pages/add-book/add-book';

import { Publish } from '../../model/publish.interface';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database'; 
declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-add-book2',
  templateUrl: 'add-book2.html',
})

export class AddBook2Page {
 enBuyuk = [];

 typeOfWork:string;
 value:any;
 result :string;

 handmadeWorkController:boolean;
 bookController:boolean;
 publishingController:boolean;
 saved:boolean;
 
 temp:string;
 cityPart:string;
 IDPart:string;
 temp1: string;
 temp2: string;
 temp3: string;
 counter: string;


 indexOfWorkRef$: AngularFireList<HandmadeWork>
 indexOfBookRef$: AngularFireList<Book2>
 indexOfPublishingRef$: AngularFireList<Publish>

 datasOfHandmadeWork = {} as HandmadeWork;
 datasOfBook = {} as Book2;
 datasOfPublisher = {} as Publish;

  constructor(
  	public navCtrl: NavController, 
  	private database: AngularFireDatabase,
   	public navParams: NavParams

   	) {
     this.handmadeWorkController=false;
     this.bookController=false;
     this.publishingController=false;
  	 this.value = navParams.get('value');
  	 this.result = "";
  	 this.temp="";
  	 this.temp1="";
  	 this.temp2="";
  	 this.temp3="";
  	 this.counter="0";

  	 
  }


  typeChooser(typeOfWork){
  	 this.saved=false;

      this.typeOfWork = typeOfWork;

      if(this.typeOfWork=="yazmaEser"){
      	this.handmadeWorkController=true;

      	this.bookController=false;
      	this.publishingController=false;

      }else if(this.typeOfWork=="kitap"){
      	this.bookController=true;
      	
      	this.handmadeWorkController=false;
      	this.publishingController=false;
      }else if(this.typeOfWork=="sureliYayin"){
      	this.publishingController=true;

      	this.handmadeWorkController=false;
      	this.bookController=false;

      }else{

      }
   }

   saveItToDatabase(infos,typeOfWork){
     this.enBuyuk=[];
     this.saved=false;
   	  if(isNaN(infos.canBeShow)){
    		infos.canBeShow=false;
    	}

    	if(isNaN(infos.canBeTake)){
    		infos.canBeTake=false;
    	}
      this.cityPart = this.value.substring(0,3);
      this.IDPart   = this.value.substring(3,6);

     	if(typeOfWork=="001"){
   		


   		this.database.list( "Works/"+ this.cityPart + "/" + this.IDPart + "/" + typeOfWork+ "/")
   		.valueChanges().subscribe((data) => {

         console.log(infos)
   				for (let item of data) {
   					this.temp1=item.IDofWork.substring(0,3);
   					this.temp2=item.IDofWork.substring(3,6);
   					this.temp3=item.IDofWork.substring(6,9);
			        if(this.temp1 == this.cityPart){
						if(this.temp2 == this.IDPart){
							if(this.temp3 == typeOfWork){
							
			            this.temp=item.IDofWork.substring(9,14); 
			            console.log("gracias-"+this.temp+"asd")

			            if(isNaN(item.IDofWork.substring(9,14)) == true){
			              this.temp="00000";
			            }

			            if(isNaN(parseInt(this.enBuyuk[parseInt(this.counter)]))==true){
			              this.enBuyuk[parseInt(this.counter)]="00000";
			            }

			            if(parseInt(this.temp)>parseInt(this.enBuyuk[parseInt(this.counter)])){
			               this.enBuyuk[parseInt(this.counter)] =this.temp;
			               console.log("EnBuyuk Bilgisi :" +this.enBuyuk);
			               this.counter = (parseInt(this.counter)+1).toString();
			            }else{}
           
          }
    	 }
        }
   	   }
   	   	  console.log("Temp Kısımı : " + this.temp);

          this.result = ( parseInt(this.temp) + 1 ).toString();	
          console.log("Oluşan result değeri : " + this.result);
          if(this.saved==false){
        	if(isNaN(parseInt(this.result))==true){
        		this.result="00001";
        	}
          if(this.result.length==1){
          	this.result="0000"+this.result;
          }else if(this.result.length==2){
          	this.result="000"+this.result;
          }else if(this.result.length==3){
          	this.result="00"+this.result;
          }else if(this.result.length==4){
          	this.result="0"+this.result;
          }else if(this.result.length==5){
          	this.result=""+this.result;
          }else{

          }
        
        
        this.indexOfWorkRef$ = this.database.list( "Works/"+this.cityPart + "/" + this.IDPart + "/" + typeOfWork+ "/" );
	  	this.indexOfWorkRef$.push({
	  		IDofWork: this.value+typeOfWork+this.result,
	  		nameOfWork: infos.nameOfWork,
	  		writerOfWork: infos.writerOfWork,
	  		dateOfWork : infos.dateOfWork,
	  		languageOfWork : infos.languageOfWork,
	  		translatorOfWork : infos.translatorOfWork,
	  		canBeTake : infos.canBeTake,
	  		canBeShow : infos.canBeShow
	  	});
	  	this.saved = true;

	  }

   			 });

	   	
	  	
	  	this.datasOfHandmadeWork = {} as HandmadeWork;

    }else if(typeOfWork=="002"){
      this.database.list( "Works/"+ this.cityPart + "/" + this.IDPart + "/" + typeOfWork+ "/")
       .valueChanges().subscribe((data) => {
           for (let item of data) {
             this.temp1=item.IDofBook.substring(0,3);
             this.temp2=item.IDofBook.substring(3,6);
             this.temp3=item.IDofBook.substring(6,9);
              if(this.temp1 == this.cityPart){
            if(this.temp2 == this.IDPart){
              if(this.temp3 == typeOfWork){
              
                  this.temp=item.IDofBook.substring(9,14); 
                  console.log("gracias-"+this.temp+"asd")

                  if(isNaN(item.IDofBook.substring(9,14)) == true){
                    this.temp="00000";
                  }
                  console.log("temp Büyük adam oldu abisi: " + this.temp)

                  if(isNaN(parseInt(this.enBuyuk[parseInt(this.counter)]))==true){
                    this.enBuyuk[parseInt(this.counter)]="00000";
                  }

                  if(parseInt(this.temp)>parseInt(this.enBuyuk[parseInt(this.counter)])){
                     this.enBuyuk[parseInt(this.counter)] =this.temp;
                     console.log("EnBuyuk Bilgisi :" +this.enBuyuk);
                     this.counter = (parseInt(this.counter)+1).toString();
                  }else{}
           
          }
       }
        }
        }
            console.log("Temp Kısımı : " + this.temp);

          this.result = ( parseInt(this.temp) + 1 ).toString();  
          console.log("Oluşan result değeri : " + this.result);
          if(this.saved==false){
          if(isNaN(parseInt(this.result))==true){
            this.result="00001";
          }
          if(this.result.length==1){
            this.result="0000"+this.result;
          }else if(this.result.length==2){
            this.result="000"+this.result;
          }else if(this.result.length==3){
            this.result="00"+this.result;
          }else if(this.result.length==4){
            this.result="0"+this.result;
          }else if(this.result.length==5){
            this.result=""+this.result;
          }else{

          }

	  	this.indexOfBookRef$ = this.database.list( "Works/"+ this.cityPart + "/" + this.IDPart + "/" + typeOfWork+ "/");
	  	this.indexOfBookRef$.push({
	  		IDofBook: this.value+typeOfWork+this.result,
	  		nameOfBook: infos.nameOfBook,
			nameOfWriter: infos.writerOfBook,
	  		typeOfBook: infos.typeOfBook,
	  		dateOfBook : infos.dateOfBook,
	  		languageOfBook : infos.languageOfBook,
	  		translatorOfBook : infos.translatorOfBook,
	  		pageNumberOfBook: infos.pageNumberOfBook,
	  		canBeTake : infos.canBeTake,
	  		canBeShow : infos.canBeShow
		});
      this.saved = true;

    }

          });
	}else if(typeOfWork=="003"){
    this.database.list("Works/" +this.cityPart + "/" + this.IDPart + "/" + typeOfWork+ "/")
       .valueChanges().subscribe((data) => {
           for (let item of data) {
             this.temp1=item.IDofPublisher.substring(0,3);
             this.temp2=item.IDofPublisher.substring(3,6);
             this.temp3=item.IDofPublisher.substring(6,9);
              if(this.temp1 == this.cityPart){
            if(this.temp2 == this.IDPart){
              if(this.temp3 == typeOfWork){
              
                  this.temp=item.IDofPublisher.substring(9,14); 

                  if(isNaN(item.IDofPublisher.substring(9,14)) == true){
                    this.temp="00000";
                  }

                  if(isNaN(parseInt(this.enBuyuk[parseInt(this.counter)]))==true){
                    this.enBuyuk[parseInt(this.counter)]="00000";
                  }

                  if(parseInt(this.temp)>parseInt(this.enBuyuk[parseInt(this.counter)])){
                     this.enBuyuk[parseInt(this.counter)] =this.temp;
                     this.counter = (parseInt(this.counter)+1).toString();
                  }else{}
           
          }
       }
        }
        }
            console.log("Temp Kısımı : " + this.temp);

          this.result = ( parseInt(this.temp) + 1 ).toString();  
          console.log("Oluşan result değeri : " + this.result);
          if(this.saved==false){
          if(isNaN(parseInt(this.result))==true){
            this.result="00001";
          }
          if(this.result.length==1){
            this.result="0000"+this.result;
          }else if(this.result.length==2){
            this.result="000"+this.result;
          }else if(this.result.length==3){
            this.result="00"+this.result;
          }else if(this.result.length==4){
            this.result="0"+this.result;
          }else if(this.result.length==5){
            this.result=""+this.result;
          }else{

          }

		this.cityPart = this.value.substring(0,3);
	   	this.IDPart   = this.value.substring(3,6);
	  	this.indexOfPublishingRef$ = this.database.list("Works/" +this.cityPart + "/" + this.IDPart + "/" + typeOfWork+ "/");
      console.log(infos)
	  	this.indexOfPublishingRef$.push({
	  		IDofPublisher: this.value+typeOfWork+this.result,
	  		nameOfPublishing: infos.nameOfPublishing,
	  		nameOfPublisher: infos.nameOfPublisher,
	  		numberOfPublishing: infos.numberOfPublishing,
	  		dateOfPublishing : infos.dateOfPublishing,
	  		languageOfPublishing : infos.languageOfPublishing,
	  		translatorOfPublishing : infos.translatorOfPublishing,
	  		canBeTake : infos.canBeTake,
	  		canBeShow : infos.canBeShow

	  	});
       this.saved = true;

    }

          });
   }else{
		
	}
  this.navCtrl.setRoot(AddBookPage);
}



}
