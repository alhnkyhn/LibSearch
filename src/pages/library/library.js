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
import { AddBookPage } from '../add-book/add-book';
import { AddLibraryPage } from '../add-library/add-library';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LibraryPage = /** @class */ (function () {
    function LibraryPage(navCtrl, navParams, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.userOfMine = {};
    }
    LibraryPage.prototype.tryToLogin = function (userOfMine) {
        var _this = this;
        this.database.list('Libraries/').valueChanges().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (item.IDofLibrary == userOfMine.email) {
                    if (item.passwordOfLibrary == userOfMine.password) {
                        _this.redirectToAddBookPage(userOfMine.email);
                    }
                }
            }
        });
        if (userOfMine.email == "admin@admin") {
            if (userOfMine.password == "admin") {
                this.redirectToAdminPage();
            }
        }
    };
    LibraryPage.prototype.redirectToAddBookPage = function (IDofLibrary) {
        console.log("Gönderilen ", IDofLibrary);
        this.navCtrl.push(AddBookPage, {
            IDofLibrary: IDofLibrary
        });
    };
    LibraryPage.prototype.redirectToAdminPage = function () {
        this.navCtrl.push(AddLibraryPage);
    };
    LibraryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-library',
            templateUrl: 'library.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase])
    ], LibraryPage);
    return LibraryPage;
}());
export { LibraryPage };
//# sourceMappingURL=library.js.map