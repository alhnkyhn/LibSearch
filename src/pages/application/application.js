var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
var ApplicationPage = /** @class */ (function () {
    function ApplicationPage(navCtrl, navParams, database, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.indexOfUser = {};
        this.valueOfEmail = navParams.get('eMail');
        this.valueOfPassword = navParams.get('password');
        this.canFormBeView = false;
        this.preInformation = true;
        this.selectedLibrary = "";
        this.isCitySelected = false;
        this.closeToCards = true;
    }
    ApplicationPage.prototype.setPreInftoFalse = function () {
        console.log("geldi");
        this.preInformation = false;
        this.canFormBeView = true;
    };
    ApplicationPage.prototype.getCity = function () {
        console.log(+this.valueOfCity);
        this.values = this.database.list('Libraries/').valueChanges();
        this.isCitySelected = true;
    };
    ApplicationPage.prototype.whichLibrary = function (value, value2) {
        this.selectedLibrary = value;
        this.selectedLibrarysName = value2;
        var toast = this.toastCtrl.create({
            message: value2 + ' Kütüphanesi seçildi',
            duration: 3000,
            position: 'top'
        });
        toast.present();
        this.closeToCards = false;
    };
    ApplicationPage.prototype.doApplication = function (indexOfUser) {
        this.canBeReserve = false;
        this.indexOfUserRef$ = this.database.list('Applications/' + this.selectedLibrary + '/');
        this.indexOfUserRef$.push({
            Email: this.valueOfEmail,
            IDofUser: this.indexOfUser.IDofUser,
            nameOfUser: this.indexOfUser.nameOfUser,
            lastnameOfUser: this.indexOfUser.lastnameOfUser,
            whichLibrary: this.selectedLibrary,
            nameOfLibrary: this.selectedLibrarysName,
            dateOfBorn: this.indexOfUser.dateOfBorn,
            canBeRezerve: 'false',
        });
        var alert = this.alertCtrl.create({
            title: 'Başvuru Başarılı!',
            subTitle: 'Artık başvuru yaptığınız kütüphanedeki uygun kitapları görebilirsiniz!',
            buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage, {
            eMail: this.valueOfEmail
        });
    };
    ApplicationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-application',
            templateUrl: 'application.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase,
            ToastController,
            AlertController])
    ], ApplicationPage);
    return ApplicationPage;
}());
export { ApplicationPage };
//# sourceMappingURL=application.js.map