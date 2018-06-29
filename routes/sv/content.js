import express from 'express';
// import cookieManager from '~/com/util/CookieManager';
// import axios from "axios/index";
// import LinkPreview from 'react-native-link-preview';


let router = express.Router();

router.get('/urlPreview', function(req, res) {

/*    const fetchUrl = req.query.fetchUrl;
    console.log(fetchUrl);

    LinkPreview.getPreview(fetchUrl, {imagesPropertyType: 'og',})
        .then(data => { return res.json(data)} );*/

    return '';
});



/*

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

router.get('/AddContent', function(req, res) {


    let userHash        =cookieManager.getUserHash(req) ;
    let userProvider    =cookieManager.getUserProvider(req);

    const  reqUrl = codes.API_CONTENT + '/AddContent';

    console.log(req.body);

    axios.post( reqUrl,req.body)
        .then(r =>{ res.json(r.data); })
        .catch(err => { console.error('>>>> :' + err);  res.status(500).json({ message: err.message })});
});
*/



module.exports = router;
