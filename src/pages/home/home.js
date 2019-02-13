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
import { AngularFireDatabase } from 'angularfire2/database';
import { ApplicationPage } from '../application/application';
import { SearchPage } from '../search/search';
import { ApplicationDetailPage } from '../application-detail/application-detail';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, database, navParams) {
        this.navCtrl = navCtrl;
        this.database = database;
        this.navParams = navParams;
        this.indexOfBook = {};
        this.tempLibInfo = {};
        this.libInfo = [];
        this.getCityNameRef$ = this.database.list('Cities/').valueChanges();
        this.getBookRef$ = this.database.list('Books/');
        this.another = this.database.list('Books/').valueChanges();
        this.valueOfEmail = navParams.get('eMail');
        this.valueOfPassword = navParams.get('password');
        if (this.valueOfEmail) {
            this.temp = this.valueOfEmail.search('@');
            this.temp1 = this.valueOfEmail.substring(0, this.temp);
        }
    }
    HomePage.prototype.navigateToApplicationPage = function () {
        this.navCtrl.push(ApplicationPage, {
            eMail: this.valueOfEmail,
            password: this.valueOfPassword
        });
    };
    HomePage.prototype.navigateToApplicationDetailPage = function () {
        this.navCtrl.push(ApplicationDetailPage, {
            eMail: this.valueOfEmail
        });
    };
    HomePage.prototype.navigateToSearchPage = function () {
        this.navCtrl.push(SearchPage, {
            eMail: this.valueOfEmail
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            AngularFireDatabase,
            NavParams])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map