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
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AdminPage } from '../admin/admin';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, afAuth, database) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.database = database;
        this.userOfMine = {};
    }
    LoginPage.prototype.tryToLogin = function (userOfMine) {
        var _this = this;
        if (this.userOfMine.email === "admin@admin.com" && this.userOfMine.password === "admin123") {
            this.navCtrl.setRoot(AdminPage);
        }
        else {
            this.afAuth.auth.signInWithEmailAndPassword(userOfMine.email, userOfMine.password).then(function () { return _this.navCtrl.setRoot(HomePage, {
                eMail: _this.userOfMine.email,
                password: _this.userOfMine.password
            }); }, function (error) { return _this.loginError = error.message; });
            console.log(this.loginError);
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        this.navCtrl.push(ForgotPasswordPage);
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(SignupPage);
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            AngularFireDatabase])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map