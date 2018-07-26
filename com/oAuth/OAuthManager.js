import passport from  'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as NaverStrategy} from 'passport-naver';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import UserProcess from '~/service/UserProcess';
import cookieManager from "../../com/util/CookieManager";
import * as codes from "../static/commonCode";
import * as cert from "../static/certificationCode";


//http://localhost:7070/sv/oAuth/google?cb=http://localhost:3000/contentMain?eventContentNo=91

function setLoginInit (req,res,err, user, info) {
    {
        let callbackUrl = codes.WEB_URL;
        if (err) {  console.log(err); return res.redirect(codes.WEB_URL + '?loginSuccess=exception');}
        if (!user){
            return res.redirect(codes.WEB_URL + '?loginSuccess=fail&message='+info.message);
        }

        if (cookieManager.getCb(req)){
            callbackUrl = cookieManager.getCb(req);
            cookieManager.removeAll(res);
        }

        cookieManager.setCookies(req, res, JSON.parse(info.message));

        return res.redirect(callbackUrl);
    }
}



class OAuthManager
{

    oAuthInit = (app)=>{

        app.use(passport.initialize())

        this.fabookInit(app);
        this.googleInit(app);
        this.naverInit(app);

        this.facebookRouter(app);
        this.naverRouter(app);
        this.googleRouter(app);

        app.get(codes.WEB_PROXY_PATH + '/oAuth/loginSuccess', this.ensureAuthenticated, function (req, res) {
            // res.json(req.query.message);
            res.send('loginSuccess');
        });
        app.get(codes.WEB_PROXY_PATH + '/oAuth/loginFail', this.ensureAuthenticated, function (req, res) {
            // res.json(req.query.message);
            res.send('loginFail');
        });

        app.get(codes.WEB_PROXY_PATH + '/oAuth/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });


        passport.serializeUser(function(user, done) {
            console.log('serialize:' + user);
            done(null, user);
        });
        /*
                passport.deserializeUser(function(user, done) {
                    //findById(id, function (err, user) {
                    console.log('deserialize:' + user);
                    done(null, user);
                    //});
                });
        */
    };

    fabookInit = (app) => {
// facebook oauth start
        passport.use(new FacebookStrategy({
                clientID: cert.FACEBOOK_CLIENTID,
                clientSecret: cert.FACEBOOK_CLIENTSECRET,
                callbackURL: codes.NODE_URL + codes.WEB_PROXY_PATH + "/oAuth/facebook/callback",
                // profileFields: ['displayName','profileUrl']
            },
            function (accessToken, refreshToken, profile, done) {
                profile.accessToken = accessToken;
                UserProcess.addUser(profile,done);
            }
        ));
    }

    facebookRouter = (app) => {
        app.get(codes.WEB_PROXY_PATH + '/oAuth/facebook' , passport.authenticate('facebook'));
        app.get(codes.WEB_PROXY_PATH + '/oAuth/facebook/callback',function(req, res, next){

            passport.authenticate('facebook', (err, user, info) => {
                return setLoginInit (req,res,err, user, info);
            })(req, res, next);
        });
    }

    naverInit = (app) => {
        passport.use(new NaverStrategy({
                clientID: cert.NAVER_CLIENTID,
                clientSecret: cert.NAVER_CLIENTSECRET,
                callbackURL: codes.NODE_URL + codes.WEB_PROXY_PATH + "/oAuth/naver/callback"
            },
            function (accessToken, refreshToken, profile, done) {

                profile.accessToken = accessToken;
                UserProcess.addUser(profile,done);
            }
        ));

    }

    naverRouter = (app)  =>{
        app.get(codes.WEB_PROXY_PATH + '/oAuth/naver', passport.authenticate('naver'));
        app.get(codes.WEB_PROXY_PATH + '/oAuth/naver/callback',function(req, res, next){

            passport.authenticate('naver', (err, user, info) => {
                return setLoginInit (req,res,err, user, info);
            })(req, res, next);
        });

    }

    googleInit = (app) => {
        passport.use(new GoogleStrategy({
                clientID: cert.GOOGLE_CLIENTID,
                clientSecret: cert.GOOGLE_CLIENTSECRET,
                callbackURL: codes.NODE_URL+ codes.WEB_PROXY_PATH  + "/oAuth/google/callback"
            },
            function (accessToken, refreshToken, profile, done) {

                profile.accessToken = accessToken;
                UserProcess.addUser(profile,done);

            }
        ));

    }


    googleRouter(app) {
        app.get(codes.WEB_PROXY_PATH + '/oAuth/google', (req, res, next) => {this.saveCallBack(req, res, next);}, passport.authenticate('google', {scope: ['openid', 'email']}));
        app.get(codes.WEB_PROXY_PATH + '/oAuth/google/callback',function(req, res, next){

            passport.authenticate('google', (err, user, info) => {
                return setLoginInit (req,res,err, user, info);
            })(req, res, next);
        });

    }

    ensureAuthenticated =(req, res, next) =>  {
        console.log('#####ensureAuthenticated');
        console.log(req.query.cd);
        next();
    }

    saveCallBack = (req, res, next) =>{

        const cookieinfo = {cb:req.query.cb};
        cookieManager.setCookies(req, res,cookieinfo);
        next();

    }

    // http://localhost:7070/sv/oAuth/google?cb=http%3A%2F%2Flocalhost%3A3000%2F
    // http://localhost:3000/contentMain?eventContentNo=91
    // http://localhost:3000/contentMain?eventContentNo=91
    // http://localhost:3000/contentMain?eventContentNo=91&name=%EC%9E%A5%EC%9E%AC%ED%9B%88
}
export  default (OAuthManager);




