import express from 'express';
import * as codes from '~/com/static/commonCode';
import cookieManager from '~/com/util/CookieManager';
import axios from "axios/index";


let router = express.Router();



router.get('/findAutoCompliteList/:autoComplteKind', function(req, res) {

    // Replay : http://localhost:8080/Content/V1/findAutoCompliteList/userHash/userProvider/autoComplteKind

    let userHash        =cookieManager.getUserHash(req) ;
    let userProvider    =cookieManager.getUserProvider(req);

    if (userHash  === '') userHash = 'none';
    if (userProvider  === '') userProvider = 'none';

    const  reqUrl = codes.API_CONTENT + '/findAutoCompliteList'
                        +'/' + userHash
                        +'/' +userProvider
                        +'/' + req.params.autoComplteKind;


    axios.get( reqUrl)
            .then(r =>{ res.json(r.data); })
            .catch(err => { console.error('>>>> :' + err);  res.status(500).json({ message: err.message })});

});


module.exports = router;
