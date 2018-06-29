import passport from  'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as NaverStrategy} from 'passport-naver';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import UserProcess from '~/service/UserProcess';
import cookieManager from "../../com/util/CookieManager";
import * as codes from "../static/commonCode";


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
                clientID: '1747638782217034',
                clientSecret: 'bdfc6ed55ae6417a5cb6a68589cfde00',
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
                clientID: 'WrgvVU7JGQQs0B7WSTqy',
                clientSecret: 'yT9jrriB9N',
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
                clientID: '130195882344-8hvernj7vv07l1nt5v321lpc707b1c66.apps.googleusercontent.com',
        clientSecret: 'bjH-jE-_65wwve8dCbvt3Ake',
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





//facebook
//profile str:{"id":"1439377842800612","displayName":"Jaehoon Jang","name":{},"provider":"facebook","_raw":"{\"name\":\"Jaehoon Jang\",\"id\":\"1439377842800612\"}","_json":{"name":"Jaehoon Jang","id":"1439377842800612"},"accessToken":"EAAY1d9zPS0oBADLN5KG21axsGLAQRWRAu8Tt86zJMZBkb6euAmZAbVItsUYrOZBZBU8IEt37eFkNJ2aTkWbYN2DjAjshuW7U54muZCqJcxNmCCoDHuLbRHwoWtGW7tP999mpJsbqwhaZBfQbqBIS2phml6pQmelJRNwWKt9lLOUQZDZD"}
//google
//profile str:{"id":"115485945540287657936","displayName":"장재훈","name":{"familyName":"장","givenName":"재훈"},"emails":[{"value":"codelifehoon@gmail.com","type":"account"}],"photos":[{"value":"https://lh5.googleusercontent.com/-l6AxNJNHOy4/AAAAAAAAAAI/AAAAAAAAIWg/WsSH3Ut8Mgg/photo.jpg?sz=50"}],"gender":"male","provider":"google","_raw":"{\n \"kind\": \"plus#person\",\n \"etag\": \"\\\"_Ek1oAZn65JmcnNnmHdEAQCMkKA/0s9FIw-h8vijXpZZX4r-WUl4MOg\\\"\",\n \"gender\": \"male\",\n \"emails\": [\n  {\n   \"value\": \"codelifehoon@gmail.com\",\n   \"type\": \"account\"\n  }\n ],\n \"objectType\": \"person\",\n \"id\": \"115485945540287657936\",\n \"displayName\": \"장재훈\",\n \"name\": {\n  \"familyName\": \"장\",\n  \"givenName\": \"재훈\"\n },\n \"url\": \"https://plus.google.com/115485945540287657936\",\n \"image\": {\n  \"url\": \"https://lh5.googleusercontent.com/-l6AxNJNHOy4/AAAAAAAAAAI/AAAAAAAAIWg/WsSH3Ut8Mgg/photo.jpg?sz=50\",\n  \"isDefault\": false\n },\n \"organizations\": [\n  {\n   \"name\": \"11st\",\n   \"title\": \"developer\",\n   \"type\": \"work\",\n   \"primary\": false\n  }\n ],\n \"placesLived\": [\n  {\n   \"value\": \"seoul\",\n   \"primary\": true\n  }\n ],\n \"isPlusUser\": true,\n \"circledByCount\": 1,\n \"verified\": false,\n \"cover\": {\n  \"layout\": \"banner\",\n  \"coverPhoto\": {\n   \"url\": \"https://lh3.googleusercontent.com/tR9UrcOQnIx0pYYPc2ssZzqT9zMriCHnQHXxbGY4KSjhdlzolJNV64rFK6XjoqfnX_kp1CGsjZmZIA=s630-fcrop64=1,2a1745a0e9b1f8aa\",\n   \"height\": 564,\n   \"width\": 940\n  },\n  \"coverInfo\": {\n   \"topImageOffset\": 0,\n   \"leftImageOffset\": 0\n  }\n }\n}\n","_json":{"kind":"plus#person","etag":"\"_Ek1oAZn65JmcnNnmHdEAQCMkKA/0s9FIw-h8vijXpZZX4r-WUl4MOg\"","gender":"male","emails":[{"value":"codelifehoon@gmail.com","type":"account"}],"objectType":"person","id":"115485945540287657936","displayName":"장재훈","name":{"familyName":"장","givenName":"재훈"},"url":"https://plus.google.com/115485945540287657936","image":{"url":"https://lh5.googleusercontent.com/-l6AxNJNHOy4/AAAAAAAAAAI/AAAAAAAAIWg/WsSH3Ut8Mgg/photo.jpg?sz=50","isDefault":false},"organizations":[{"name":"11st","title":"developer","type":"work","primary":false}],"placesLived":[{"value":"seoul","primary":true}],"isPlusUser":true,"circledByCount":1,"verified":false,"cover":{"layout":"banner","coverPhoto":{"url":"https://lh3.googleusercontent.com/tR9UrcOQnIx0pYYPc2ssZzqT9zMriCHnQHXxbGY4KSjhdlzolJNV64rFK6XjoqfnX_kp1CGsjZmZIA=s630-fcrop64=1,2a1745a0e9b1f8aa","height":564,"width":940},"coverInfo":{"topImageOffset":0,"leftImageOffset":0}}},"accessToken":"ya29.GltgBenTqQF6RPZ2wo0zR-eU5JzD0WPRlxU-p5uW1YmzkhGf9gS3pnjAwVVprjLfK19vwFJYJNm3_XXjmTtOtfaoUgbHEi_pSpzy7LcocqYWxWNv8WlkfJGxMfC5"}
//naver
//profile str:{"provider":"naver","id":"37302261","displayName":"구루마블","emails":[{"value":"codelife@naver.com"}],"_json":{"email":"codelife@naver.com","nickname":"구루마블","profile_image":"https://ssl.pstatic.net/static/pwe/address/img_profile.png","age":"40-49","birthday":"12-18","id":"37302261"},"accessToken":"AAAAODpYcv9+4Rl1uzZeiCcknVbN/Q7UNwKAtWxXtVS0NF9cYuX0ZxjR1TVYB+63mVMFXDaLOhtKgxraQD+3v6baDCk="}

// member_oauth
// provider
// id
// displayName
// photos
// etc




