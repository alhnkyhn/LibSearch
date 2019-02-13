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
import { LoginPage } from '../login/login';
import * as firebase from 'firebase/app';
var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userOfMine = {};
    }
    ForgotPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        var auth = firebase.auth();
        if (this.userOfMine.email == null) {
            return;
        }
        else {
            return auth.sendPasswordResetEmail(this.userOfMine.email)
                .then(function () { return _this.navCtrl.setRoot(LoginPage); })
                .catch(function (error) { return console.log("hata var"); });
        }
    };
    ForgotPasswordPage = __decorate([
        Component({
            selector: 'page-forgot-password',
            templateUrl: 'forgot-password.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());
export { ForgotPasswordPage };
//# sourceMappingURL=forgot-password.js.map