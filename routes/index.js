import cookieManager from "../com/util/CookieManager";

const express = require('express');
const router = express.Router();

// router.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '/index.html'));
// });




router.get('/get1', function(req, res) {

    res.send('get-one');

});

/* default router page. */
// router.get('*', function(req, res, next) {
//     console.log('##' +  req.params[0] );
//     res.sendFile(path.resolve(__dirname, '/' + req.params[0]));
//
// });


module.exports = router;
