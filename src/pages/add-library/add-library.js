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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddCityPage } from '../add-city/add-city';
import { AddBookPage } from '../add-book/add-book';
import { ToastController } from 'ionic-angular';
var AddLibraryPage = /** @class */ (function () {
    function AddLibraryPage(navCtrl, navParams, database, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.indexOfLibrary = {};
        this.enBuyuk = [];
        this.indexOfLibraryRef$ = this.database.list('Libraries/');
        this.getCityNameRef$ = this.database.list('Cities/').valueChanges();
        this.indexOfLibrary.nameOfLibrary = "";
        this.temp = "001";
        this.result = "";
        this.cityInfo = "";
        this.libraryInfo = "";
        this.counter = "0";
        this.isFirstTime = true;
        this.anyOtherLibrary = false;
        this.saved = false;
    }
    AddLibraryPage.prototype.addLibrary = function (indexOfLibrary) {
        var _this = this;
        this.saved = false;
        this.anyOtherLibrary = false;
        this.cityInfo = this.indexOfLibrary.nameOfCity;
        this.libraryInfo = this.indexOfLibrary.nameOfLibrary;
        this.passwordInfo = this.indexOfLibrary.passwordOfLibrary;
        this.database.list('Libraries/').valueChanges().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var cityInfos = data_1[_i];
                console.log(cityInfos.nameOfCity + "-------" + _this.cityInfo);
                if (cityInfos.nameOfCity == _this.cityInfo) {
                    _this.anyOtherLibrary = true;
                }
                else { }
            }
            console.log("Is there another Library?= " + _this.anyOtherLibrary);
            if (_this.anyOtherLibrary == false) {
                _this.result = "001";
                _this.anyOtherLibrary = true;
                console.log("İlk defa kaydedildi mi ? : " + _this.saved);
            }
            else if (_this.anyOtherLibrary == true && _this.saved == false) { // Eğer ilk defa kaydedilmiyorsa
                for (var _a = 0, data_2 = data; _a < data_2.length; _a++) {
                    var item = data_2[_a];
                    console.log("item.nameOfCity  =" + item.nameOfCity + "this.cityInfo=" + _this.cityInfo);
                    if (item.nameOfCity == _this.cityInfo) {
                        _this.temp = item.IDofLibrary.substring(3, 6);
                        if (_this.temp == "") {
                            _this.temp = "000";
                        }
                        if (isNaN(parseInt(_this.enBuyuk[parseInt(_this.cityInfo)])) == true) {
                            _this.enBuyuk[parseInt(_this.cityInfo)] = "000";
                        }
                        if (parseInt(_this.temp) > parseInt(_this.enBuyuk[parseInt(_this.cityInfo)])) {
                            _this.enBuyuk[parseInt(_this.cityInfo)] = _this.temp;
                            console.log("EnBuyuk Bilgisi :" + _this.enBuyuk);
                        }
                        else { }
                    }
                }
                if (parseInt(_this.enBuyuk[parseInt(_this.cityInfo)]).toString().length == 1) {
                    _this.result = "00" + (parseInt(_this.enBuyuk[parseInt(_this.cityInfo)]) + 1);
                }
                else if (parseInt(_this.enBuyuk[parseInt(_this.cityInfo)]).toString().length == 2) {
                    _this.result = "0" + (parseInt(_this.enBuyuk[parseInt(_this.cityInfo)]) + 1);
                }
                else if (parseInt(_this.enBuyuk[parseInt(_this.cityInfo)]).toString().length == 3) {
                    _this.result = "" + (parseInt(_this.enBuyuk[parseInt(_this.cityInfo)]) + 1);
                }
                else { }
                console.log("Oluşan result değeri : " + _this.result);
            }
            else { }
            if (_this.saved == false) {
                _this.indexOfLibraryRef$.push({
                    nameOfCity: _this.cityInfo,
                    nameOfLibrary: _this.libraryInfo,
                    IDofLibrary: _this.cityInfo + _this.result,
                    passwordOfLibrary: _this.passwordInfo
                });
                _this.saved = true;
                var alert_1 = _this.alertCtrl.create({
                    title: 'Dikkat!',
                    subTitle: 'Kütüphane başarı ile kayıt edildi.\nKullanıcı Adı : ' + _this.cityInfo + _this.result + '\nŞifre:' + _this.passwordInfo,
                    buttons: ['Tamam']
                });
                alert_1.present();
            }
            _this.indexOfLibrary = {};
            _this.navCtrl.setRoot(AddBookPage, {
                IDofLibrary: _this.cityInfo + _this.result
            });
        });
    };
    AddLibraryPage.prototype.navigateToAddCityPage = function () {
        this.navCtrl.push(AddCityPage);
    };
    AddLibraryPage.prototype.sendSuccessNotification = function () {
        var toast = this.toastCtrl.create({
            message: 'Kütüphane ekleme başarılı!',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    AddLibraryPage.prototype.sendFailureNotification = function () {
        var toast = this.toastCtrl.create({
            message: 'Lütfen bir kütüphane ismi girin!',
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddLibraryPage.prototype.alertOfInformation = function () {
        var alert = this.alertCtrl.create({
            title: 'Bilgi',
            subTitle: 'Her kütüphanenin kendine özgü bir arayüzü olacağından dolayı bir kütüphane arayüzüne erişim şifresi oluşturmanız gerekmekte!',
            buttons: ['Tamam']
        });
        alert.present();
    };
    AddLibraryPage = __decorate([
        Component({
            selector: 'page-add-library',
            templateUrl: 'add-library.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase,
            ToastController,
            AlertController])
    ], AddLibraryPage);
    return AddLibraryPage;
}());
export { AddLibraryPage };
//# sourceMappingURL=add-library.js.map