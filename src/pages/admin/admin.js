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
import { AddBookPage } from '../add-book/add-book';
import { AngularFireDatabase } from 'angularfire2/database';
var AdminPage = /** @class */ (function () {
    function AdminPage(navCtrl, navParams, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.getBookRef$ = this.database.list('Books/').valueChanges();
    }
    AdminPage.prototype.navigateToAddBookPage = function () {
        this.navCtrl.push(AddBookPage);
    };
    AdminPage = __decorate([
        Component({
            selector: 'page-admin',
            templateUrl: 'admin.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase])
    ], AdminPage);
    return AdminPage;
}());
export { AdminPage };
//# sourceMappingURL=admin.js.map