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
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
var AcceptPage = /** @class */ (function () {
    function AcceptPage(navCtrl, database, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.IDofLibrary = navParams.get('IDofLibrary');
        this.values = this.database.list('Applications/' + this.IDofLibrary + '/').valueChanges();
        this.keyy = "";
    }
    AcceptPage.prototype.AcceptOrNot = function (input) {
        var _this = this;
        this.once = true;
        var alert = this.alertCtrl.create({
            title: input.nameOfUser + ' ' + input.lastnameOfUser + 'onaylansın mı?',
            buttons: [
                {
                    text: 'Onayla',
                    handler: function (data) {
                        _this.database.list('Applications/' + _this.IDofLibrary + '/').valueChanges().subscribe(function (data2) {
                            for (var _i = 0, data2_1 = data2; _i < data2_1.length; _i++) {
                                var item2 = data2_1[_i];
                                if (_this.once == true) {
                                    console.log("Once bilgisi : " + _this.once);
                                    console.log(item2.IDofUser + " ----" + input.IDofUser);
                                    if (item2.IDofUser == input.IDofUser) {
                                        firebase.database().ref('Applications/' + _this.IDofLibrary).orderByChild('IDofUser').equalTo(input.IDofUser)
                                            .once('value').then(function (snapshot) {
                                            snapshot.forEach(function (child) {
                                                child.ref.remove();
                                            });
                                        });
                                        _this.database.list('Applications/' + _this.IDofLibrary + '/').push({
                                            Email: item2.Email,
                                            IDofUser: item2.IDofUser,
                                            nameOfUser: item2.nameOfUser,
                                            lastnameOfUser: item2.lastnameOfUser,
                                            whichLibrary: item2.whichLibrary,
                                            nameOfLibrary: item2.nameOfLibrary,
                                            dateOfBorn: item2.dateOfBorn,
                                            canBeRezerve: 'true',
                                        });
                                        _this.once = false;
                                    }
                                    item2 = {};
                                }
                            }
                        });
                    }
                },
                {
                    text: 'Reddet',
                    handler: function (data) {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    AcceptPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-accept',
            templateUrl: 'accept.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AngularFireDatabase,
            NavParams,
            AlertController])
    ], AcceptPage);
    return AcceptPage;
}());
export { AcceptPage };
//# sourceMappingURL=accept.js.map