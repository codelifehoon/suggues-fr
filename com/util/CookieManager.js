import winston from 'winston';
import * as codes from "../static/commonCode";


class CookieManager {


    static getCookieName = () => 'webCertInfo';
    static getCookieSetting = () => {
        let exporeDate = new Date();
        exporeDate.setDate(exporeDate.getDate() + 365);



        return {domain: codes.COOKIE_DOMAIN ,  expires:exporeDate}
        // return { expires:exporeDate, httpOnly: true}
        //return { expires: new Date(Date.now() + 900000), httpOnly: true};
    }

    static isCookies(req, cookieName = this.getCookieName()) {

        if (typeof(req.cookies[cookieName]) === 'undefined') return false;
        return true;

    }

    static  setCookies (req, res, newCookieInfo, cookieName = this.getCookieName()) {

        let oldCookie = req.cookies[cookieName];
        let newObj = Object.assign({},oldCookie,newCookieInfo);

        winston.log('debug', 'setCookies', { newCookie: newObj});

        res.cookie(cookieName , newObj , this.getCookieSetting());
    };

    static getCookies (req, cookieName = this.getCookieName()) {

        return  req.cookies[cookieName];
    };

    static getUserHash (req, cookieName = this.getCookieName()) {

        if (this.isCookies(req,cookieName)) return this.getCookies(req,cookieName).userHash;
        else return '';
    };
y
    static getUserProvider (req, cookieName = this.getCookieName()) {

        if (this.isCookies(req,cookieName)) return this.getCookies(req,cookieName).userProvider ;
        else return '';

    };

    static getCb (req, cookieName = this.getCookieName()) {

        if (this.isCookies(req,cookieName)) return this.getCookies(req,cookieName).cb;
        else return '';

    };



    static removeAll (res, cookieName = this.getCookieName()) {

        res.cookie(cookieName , ''  , this.getCookieSetting());
    };



}

export  default (CookieManager);


