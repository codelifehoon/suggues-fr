// var express = require('express');
// var router = express.Router();


import express  from 'express';
import cookieManager from '../com/util/cookieManager';
let router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function(req, res) {
    res.send('Birds home page11111!!!');
});
// define the about route
router.get('/about', function(req, res) {
    res.send('About birds');
});

// define the about route
router.get('/setCookie/:name/:age', function(req, res) {


    let cookieInfo = {name: req.params.name
        ,age : req.params.age
        ,gender : 'M'}

    console.log("###############");
    console.log(cookieInfo);
    
    let cm = new cookieManager();

    cm.setCookies(req,res,cookieInfo);


    res.end();

});






module.exports = router;