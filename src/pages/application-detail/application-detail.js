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
var ApplicationDetailPage = /** @class */ (function () {
    function ApplicationDetailPage(navCtrl, navParams, database) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.array = [];
        this.arrayWL = [];
        this.arrayR = [];
        this.result = [];
        this.valueOfEmail = navParams.get('eMail');
        this.i = 0;
        this.j = 0;
        this.database.list('Libraries/')
            .valueChanges().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _this.array[_this.i] = item.IDofLibrary;
                _this.i++;
            }
            console.log(_this.array.length);
            for (var k = 0; k < _this.array.length; k++) {
                console.log(_this.array[k]);
                _this.database.list('Applications/' + _this.array[k] + '/')
                    .valueChanges().subscribe(function (data) {
                    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                        var item = data_2[_i];
                        console.log(item.Email + "asda" + _this.valueOfEmail);
                        if (item.Email === _this.valueOfEmail) {
                            if (item.canBeRezerve == 'true') {
                                _this.result[_this.j] = item.nameOfLibrary + " Kütüphanesine başvuru durumunuz: Başvurunuz Onaylandı";
                            }
                            else {
                                _this.result[_this.j] = item.nameOfLibrary + " Kütüphanesine başvuru durumunuz: Başvurunuz henüz onaylanmadı";
                            }
                            _this.j++;
                        }
                        else {
                        }
                    }
                });
            }
        });
    }
    ApplicationDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-application-detail',
            templateUrl: 'application-detail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase])
    ], ApplicationDetailPage);
    return ApplicationDetailPage;
}());
export { ApplicationDetailPage };
//# sourceMappingURL=application-detail.js.map