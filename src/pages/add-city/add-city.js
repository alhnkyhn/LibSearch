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
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { ToastController } from 'ionic-angular';
var AddCityPage = /** @class */ (function () {
    function AddCityPage(navCtrl, navParams, database, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.indexOfCity = {};
        this.indexOfCityRef$ = this.database.list('Cities/');
        this.indexOfCity.nameOfCity = "";
    }
    AddCityPage.prototype.addCity = function (indexOfCity) {
        if (indexOfCity.nameOfCity.length > 1) {
            this.indexOfCityRef$.push({
                nameOfCity: this.indexOfCity.nameOfCity,
            });
            this.indexOfCity = {};
            this.navCtrl.pop();
            this.sendSuccessNotification();
        }
        else {
            this.sendFailureNotification();
        }
    };
    AddCityPage.prototype.sendSuccessNotification = function () {
        var toast = this.toastCtrl.create({
            message: 'Şehir ekleme başarılı!',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddCityPage.prototype.sendFailureNotification = function () {
        var toast = this.toastCtrl.create({
            message: 'Lütfen bir şehir ismi girin!',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddCityPage = __decorate([
        Component({
            selector: 'page-add-city',
            templateUrl: 'add-city.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase,
            ToastController])
    ], AddCityPage);
    return AddCityPage;
}());
export { AddCityPage };
//# sourceMappingURL=add-city.js.map