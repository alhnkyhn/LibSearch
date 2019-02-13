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
var AddBook2Page = /** @class */ (function () {
    function AddBook2Page(navCtrl, database, navParams) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.navParams = navParams;
        this.enBuyuk = [];
        this.datasOfHandmadeWork = {};
        this.datasOfBook = {};
        this.datasOfPublisher = {};
        this.handmadeWorkController = false;
        this.bookController = false;
        this.publishingController = false;
        this.value = navParams.get('value');
        this.result = "";
        this.temp = "";
        this.temp1 = "";
        this.temp2 = "";
        this.temp3 = "";
        this.counter = "0";
    }
    AddBook2Page.prototype.typeChooser = function (typeOfWork) {
        this.saved = false;
        this.typeOfWork = typeOfWork;
        if (this.typeOfWork == "yazmaEser") {
            this.handmadeWorkController = true;
            this.bookController = false;
            this.publishingController = false;
        }
        else if (this.typeOfWork == "kitap") {
            this.bookController = true;
            this.handmadeWorkController = false;
            this.publishingController = false;
        }
        else if (this.typeOfWork == "sureliYayin") {
            this.publishingController = true;
            this.handmadeWorkController = false;
            this.bookController = false;
        }
        else {
        }
    };
    AddBook2Page.prototype.saveItToDatabase = function (infos, typeOfWork) {
        var _this = this;
        this.enBuyuk = [];
        this.saved = false;
        if (isNaN(infos.canBeShow)) {
            infos.canBeShow = false;
        }
        if (isNaN(infos.canBeTake)) {
            infos.canBeTake = false;
        }
        this.cityPart = this.value.substring(0, 3);
        this.IDPart = this.value.substring(3, 6);
        if (typeOfWork == "001") {
            this.database.list("Works/" + this.cityPart + "/" + this.IDPart + "/" + typeOfWork + "/")
                .valueChanges().subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    _this.temp1 = item.IDofWork.substring(0, 3);
                    _this.temp2 = item.IDofWork.substring(3, 6);
                    _this.temp3 = item.IDofWork.substring(6, 9);
                    if (_this.temp1 == _this.cityPart) {
                        if (_this.temp2 == _this.IDPart) {
                            if (_this.temp3 == typeOfWork) {
                                _this.temp = item.IDofWork.substring(9, 14);
                                console.log("gracias-" + _this.temp + "asd");
                                if (isNaN(item.IDofWork.substring(9, 14)) == true) {
                                    _this.temp = "00000";
                                }
                                console.log("temp Büyük adam oldu abisi: " + _this.temp);
                                if (isNaN(parseInt(_this.enBuyuk[parseInt(_this.counter)])) == true) {
                                    _this.enBuyuk[parseInt(_this.counter)] = "00000";
                                }
                                if (parseInt(_this.temp) > parseInt(_this.enBuyuk[parseInt(_this.counter)])) {
                                    _this.enBuyuk[parseInt(_this.counter)] = _this.temp;
                                    console.log("EnBuyuk Bilgisi :" + _this.enBuyuk);
                                    _this.counter = (parseInt(_this.counter) + 1).toString();
                                }
                                else { }
                            }
                        }
                    }
                }
                console.log("Temp Kısımı : " + _this.temp);
                _this.result = (parseInt(_this.temp) + 1).toString();
                console.log("Oluşan result değeri : " + _this.result);
                if (_this.saved == false) {
                    if (isNaN(parseInt(_this.result)) == true) {
                        _this.result = "00001";
                    }
                    if (_this.result.length == 1) {
                        _this.result = "0000" + _this.result;
                    }
                    else if (_this.result.length == 2) {
                        _this.result = "000" + _this.result;
                    }
                    else if (_this.result.length == 3) {
                        _this.result = "00" + _this.result;
                    }
                    else if (_this.result.length == 4) {
                        _this.result = "0" + _this.result;
                    }
                    else if (_this.result.length == 5) {
                        _this.result = "" + _this.result;
                    }
                    else {
                    }
                    console.log("Result neden böyle yaptın ki knk :" + _this.result);
                    _this.indexOfWorkRef$ = _this.database.list("Works/" + _this.cityPart + "/" + _this.IDPart + "/" + typeOfWork + "/");
                    _this.indexOfWorkRef$.push({
                        IDofWork: _this.value + typeOfWork + _this.result,
                        nameOfWork: infos.nameOfWork,
                        writerOfWork: infos.writerOfWork,
                        dateOfWork: infos.dateOfWork,
                        languageOfWork: infos.languageOfWork,
                        translatorOfWork: infos.translatorOfWork,
                        canBeTake: infos.canBeTake,
                        canBeShow: infos.canBeShow
                    });
                    _this.saved = true;
                }
            });
            this.datasOfHandmadeWork = {};
        }
        else if (typeOfWork == "002") {
            this.database.list("Works/" + this.cityPart + "/" + this.IDPart + "/" + typeOfWork + "/")
                .valueChanges().subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.temp1 = item.IDofBook.substring(0, 3);
                    _this.temp2 = item.IDofBook.substring(3, 6);
                    _this.temp3 = item.IDofBook.substring(6, 9);
                    if (_this.temp1 == _this.cityPart) {
                        if (_this.temp2 == _this.IDPart) {
                            if (_this.temp3 == typeOfWork) {
                                _this.temp = item.IDofBook.substring(9, 14);
                                console.log("gracias-" + _this.temp + "asd");
                                if (isNaN(item.IDofBook.substring(9, 14)) == true) {
                                    _this.temp = "00000";
                                }
                                console.log("temp Büyük adam oldu abisi: " + _this.temp);
                                if (isNaN(parseInt(_this.enBuyuk[parseInt(_this.counter)])) == true) {
                                    _this.enBuyuk[parseInt(_this.counter)] = "00000";
                                }
                                if (parseInt(_this.temp) > parseInt(_this.enBuyuk[parseInt(_this.counter)])) {
                                    _this.enBuyuk[parseInt(_this.counter)] = _this.temp;
                                    console.log("EnBuyuk Bilgisi :" + _this.enBuyuk);
                                    _this.counter = (parseInt(_this.counter) + 1).toString();
                                }
                                else { }
                            }
                        }
                    }
                }
                console.log("Temp Kısımı : " + _this.temp);
                _this.result = (parseInt(_this.temp) + 1).toString();
                console.log("Oluşan result değeri : " + _this.result);
                if (_this.saved == false) {
                    if (isNaN(parseInt(_this.result)) == true) {
                        _this.result = "00001";
                    }
                    if (_this.result.length == 1) {
                        _this.result = "0000" + _this.result;
                    }
                    else if (_this.result.length == 2) {
                        _this.result = "000" + _this.result;
                    }
                    else if (_this.result.length == 3) {
                        _this.result = "00" + _this.result;
                    }
                    else if (_this.result.length == 4) {
                        _this.result = "0" + _this.result;
                    }
                    else if (_this.result.length == 5) {
                        _this.result = "" + _this.result;
                    }
                    else {
                    }
                    _this.indexOfBookRef$ = _this.database.list("Works/" + _this.cityPart + "/" + _this.IDPart + "/" + typeOfWork + "/");
                    _this.indexOfBookRef$.push({
                        IDofBook: _this.value + typeOfWork + _this.result,
                        nameOfBook: infos.nameOfBook,
                        nameOfWriter: infos.writerOfBook,
                        typeOfBook: infos.typeOfBook,
                        dateOfBook: infos.dateOfBook,
                        languageOfBook: infos.languageOfBook,
                        translatorOfBook: infos.translatorOfBook,
                        pageNumberOfBook: infos.pageNumberOfBook,
                        canBeTake: infos.canBeTake,
                        canBeShow: infos.canBeShow
                    });
                    _this.saved = true;
                }
            });
            //this.datasOfBook = {} as Book2;
        }
        else if (typeOfWork == "003") {
            this.database.list("Works/" + this.cityPart + "/" + this.IDPart + "/" + typeOfWork + "/")
                .valueChanges().subscribe(function (data) {
                for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                    var item = data_3[_i];
                    _this.temp1 = item.IDofPublisher.substring(0, 3);
                    _this.temp2 = item.IDofPublisher.substring(3, 6);
                    _this.temp3 = item.IDofPublisher.substring(6, 9);
                    if (_this.temp1 == _this.cityPart) {
                        if (_this.temp2 == _this.IDPart) {
                            if (_this.temp3 == typeOfWork) {
                                _this.temp = item.IDofPublisher.substring(9, 14);
                                console.log("gracias-" + _this.temp + "asd");
                                if (isNaN(item.IDofPublisher.substring(9, 14)) == true) {
                                    _this.temp = "00000";
                                }
                                console.log("temp Büyük adam oldu abisi: " + _this.temp);
                                if (isNaN(parseInt(_this.enBuyuk[parseInt(_this.counter)])) == true) {
                                    _this.enBuyuk[parseInt(_this.counter)] = "00000";
                                }
                                if (parseInt(_this.temp) > parseInt(_this.enBuyuk[parseInt(_this.counter)])) {
                                    _this.enBuyuk[parseInt(_this.counter)] = _this.temp;
                                    console.log("EnBuyuk Bilgisi :" + _this.enBuyuk);
                                    _this.counter = (parseInt(_this.counter) + 1).toString();
                                }
                                else { }
                            }
                        }
                    }
                }
                console.log("Temp Kısımı : " + _this.temp);
                _this.result = (parseInt(_this.temp) + 1).toString();
                console.log("Oluşan result değeri : " + _this.result);
                if (_this.saved == false) {
                    if (isNaN(parseInt(_this.result)) == true) {
                        _this.result = "00001";
                    }
                    if (_this.result.length == 1) {
                        _this.result = "0000" + _this.result;
                    }
                    else if (_this.result.length == 2) {
                        _this.result = "000" + _this.result;
                    }
                    else if (_this.result.length == 3) {
                        _this.result = "00" + _this.result;
                    }
                    else if (_this.result.length == 4) {
                        _this.result = "0" + _this.result;
                    }
                    else if (_this.result.length == 5) {
                        _this.result = "" + _this.result;
                    }
                    else {
                    }
                    _this.cityPart = _this.value.substring(0, 3);
                    _this.IDPart = _this.value.substring(3, 6);
                    _this.indexOfPublishingRef$ = _this.database.list("Works/" + _this.cityPart + "/" + _this.IDPart + "/" + typeOfWork + "/");
                    _this.indexOfPublishingRef$.push({
                        IDofPublisher: _this.value + typeOfWork + _this.result,
                        nameOfPublishing: infos.nameOfPublishing,
                        nameOfPublisher: infos.nameOfPublisher,
                        numberOfPublishing: infos.numberOfPublishing,
                        dateOfPublishing: infos.dateOfPublishing,
                        languageOfPublishing: infos.languageOfPublishing,
                        translatorOfPublishing: infos.translatorOfPublishing,
                        canBeTake: infos.canBeTake,
                        canBeShow: infos.canBeShow
                    });
                    _this.saved = true;
                }
            });
            //	this.datasOfPublisher = {} as Publish;
        }
        else {
        }
    };
    AddBook2Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-add-book2',
            templateUrl: 'add-book2.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AngularFireDatabase,
            NavParams])
    ], AddBook2Page);
    return AddBook2Page;
}());
export { AddBook2Page };
//# sourceMappingURL=add-book2.js.map