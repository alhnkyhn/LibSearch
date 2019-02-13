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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddLibraryPage } from '../add-library/add-library';
import { AddBook2Page } from '../add-book2/add-book2';
import { AcceptPage } from '../accept/accept';
var AddBookPage = /** @class */ (function () {
    function AddBookPage(navCtrl, navParams, database, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.value = navParams.get('IDofLibrary');
        this.database.list('Libraries/').valueChanges().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (item.IDofLibrary == _this.value) {
                    _this.nameOfLibrary = item.nameOfLibrary;
                }
            }
        });
    }
    AddBookPage.prototype.navigateToAddLibraryPage = function () {
        this.navCtrl.push(AddLibraryPage);
    };
    AddBookPage.prototype.navigateToAddBook2 = function () {
        this.navCtrl.push(AddBook2Page, {
            value: this.value
        });
    };
    AddBookPage.prototype.navigateToAcceptPage = function () {
        this.navCtrl.push(AcceptPage, {
            IDofLibrary: this.value
        });
    };
    AddBookPage = __decorate([
        Component({
            selector: 'page-add-book',
            templateUrl: 'add-book.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase,
            ToastController])
    ], AddBookPage);
    return AddBookPage;
}());
export { AddBookPage };
//# sourceMappingURL=add-book.js.map