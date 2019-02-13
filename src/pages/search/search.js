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
import * as firebase from 'firebase/app';
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.libraries = [];
        this.cities = [];
        this.codeOfLibraries = [];
        this.result = [];
        this.valueOfEmail = navParams.get('eMail');
        this.handmadeRef$ = database.list('Temp/').valueChanges();
    }
    SearchPage.prototype.listToBooks = function (typeOfSearch) {
        console.log(typeOfSearch);
        if (typeOfSearch == "0") {
            this.canSelectCity = true;
        }
        else if (typeOfSearch == "1") {
            this.canSelectLibrary = true;
        }
        else if (typeOfSearch == "2") {
            this.canSelectTypeOfWork = true;
        }
        else if (typeOfSearch == "3") {
            console.log("n");
        }
        else {
            console.log("kk");
        }
    };
    SearchPage.prototype.getCity = function (nameOfCity) {
        firebase.database().ref('Temp/').remove();
        firebase.database().ref('Works/').orderByChild('IDofUser').once('value').then(function (snapshot) {
            snapshot.forEach(function (child) {
                firebase.database().ref('Works/' + child.key + '/').orderByChild('IDofUser').once('value').then(function (snapshot) {
                    snapshot.forEach(function (child1) {
                        firebase.database().ref('Works/' + child.key + '/' + child1.key + '/').orderByChild('IDofUser').once('value').then(function (snapshot) {
                            snapshot.forEach(function (child2) {
                                firebase.database().ref('Works/' + child.key + '/' + child1.key + '/' + child2.key + '/').orderByChild('IDofUser').once('value').then(function (snapshot) {
                                    snapshot.forEach(function (child3) {
                                        if (child2.key === "001") {
                                            if (child3.val().IDofWork.substring(0, 3) === nameOfCity) {
                                                var returnValue = child3.val().nameOfWork;
                                                console.log("sa" + returnValue);
                                                console.log("also: " + child3.val().nameOfWork);
                                                console.log("second also : " + child3.val().nameOfWriter);
                                                firebase.database().ref('Temp/').push({
                                                    typeOf: child2.key,
                                                    IDofBook: child3.val().IDofWork,
                                                    nameOfBook: returnValue,
                                                    nameOfWriter: child3.val().writerOfWork,
                                                    canBeShow: child3.val().canBeShow,
                                                    canBeTake: child3.val().canBeTake,
                                                    languageOfWork: child3.val().languageOfWork,
                                                    translatorOfWork: child3.val().translatorOfWork,
                                                    dateOfWork: child3.val().dateOfWork
                                                });
                                            }
                                        }
                                        else if (child2.key === "002") {
                                            if (child3.val().IDofBook.substring(0, 3) === nameOfCity) {
                                                console.log(child3.val().IDofBook.substring(0, 3));
                                                firebase.database().ref('Temp/').push({
                                                    IDofBook: child3.val().IDofBook,
                                                    nameOfBook: child3.val().nameOfBook,
                                                    nameOfWriter: child3.val().nameOfWriter,
                                                    canBeTake: child3.val().nameOfWriter,
                                                    canBeShow: 
                                                });
                                            }
                                        }
                                        else if (child2.key === "003") {
                                            if (child3.val().IDofPublisher.substring(0, 3) === nameOfCity) {
                                                console.log(child3.val().IDofPublisher.substring(0, 3));
                                                firebase.database().ref('Temp/').push({
                                                    IDofBook: child3.val().IDofPublisher,
                                                    nameOfBook: child3.val().nameOfPublishing,
                                                    number: child3.val().numberOfPublishing,
                                                    nameOfWriter: child3.val().nameOfPublisher
                                                });
                                            }
                                        }
                                        else {
                                            console.log("Uh! Seems like a there is a mistake!");
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    SearchPage.prototype.getData = function (tempValue) {
        console.log("geldii : " + tempValue);
        this.result = this.result + this.getCity(tempValue);
        console.log(this.result);
    };
    SearchPage.prototype.getLink = function (value) {
        return "http://www.barcodes4.me/barcode/i2of5/" + value + ".jpg?width=200&height=100";
    };
    SearchPage.prototype.deneme = function (value) {
        return "http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=" + value + "&chld=H|0";
    };
    SearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map