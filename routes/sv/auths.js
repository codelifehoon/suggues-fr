import express from 'express';
import cookieManager from "../../com/util/CookieManager";

let router = express.Router();


router.get('/getAuthInfo', function(req, res) {

    // let  userJson = {
    //     userProvider :cookieManager.getCookies(req).userProvider,
    //     userPhotos :cookieManager.getCookies(req).userPhotos,
    //     userHash :cookieManager.getCookies(req).userHash,
    //     userNm :cookieManager.getCookies(req).userNm,
    // };
    //
    res.json(cookieManager.getCookies(req));
});

router.get('/setLogout/:redirurl', function(req, res) {

    cookieManager.removeAll(res);
    res.redirect(req.params.redirurl);

});


module.exports = router;
