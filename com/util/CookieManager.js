import winston from 'winston';

class CookieManager {


    static getCookieName = () => 'webCertInfo';
    static getCookieSetting = () => {
        let exporeDate = new Date();
        exporeDate.setDate(exporeDate.getDate() + 365);

        return { expires:exporeDate, httpOnly: true}
        //return { expires: new Date(Date.now() + 900000), httpOnly: true};
    }

    static isCookies(req, cookieName = this.getCookieName()) {

        console.log(req.signedCookies[cookieName]);

        if (typeof(req.signedCookies[cookieName]) === 'undefined') return false;
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

    static getUserProvider (req, cookieName = this.getCookieName()) {

        if (this.isCookies(req,cookieName)) return this.getCookies(req,cookieName).userProvider ;
        else return '';

    };


    static removeAll (res, cookieName = this.getCookieName()) {

        res.cookie(cookieName , '' );
    };

}

export  default (CookieManager);


