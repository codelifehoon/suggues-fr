'use strict';
// var Data = require('date-utils');
// var HttpReq = require('request');
import  HttpReq from 'request';
import  Data from  'date-utils';




// -- 시간출력
function dataFormat()
{
    var newDate = new Date();
    return newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

}


// javaScript 비동기 호출의 이해 start

function h(z) {
    // Print stack trace
    console.log(new Error().stack); // (A)
}
function g(y) {
    h(y + 1); // (B)
}
function f(x) {
    g(x + 1); // (C)
}
f(3); // (D)



function delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject, ms); // (A)
    });
}

// Using delay():
delay(5000).then(function () { // (B)
    console.log('5 seconds have passed!')
            })
    .catch(() => console.log('5 seconds have error!'));



setTimeout(() => console.log('process B'));
console.log('process A');


console.log('A');
identity('B', function step2(result2) {
    console.log(result2);
    identity('C', function step3(result3) {
        console.log(result3);
    });
    console.log('D');
});
console.log('E');

// Output: A E B D C


function identity(input, callback) {
    setTimeout(function () {
        callback(input);
    }, 0);
}


console.log('A');
identity('B', step2);
function step2(result2) {
    // The program continues here
    console.log(result2);
    identity('C', step3);
    console.log('D');
}
function step3(result3) {
    console.log(result3);
}
console.log('E');



//  httpGet 비동기
function httpGet(url) {
    return new Promise(
        function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (this.status === 200) {
                    // Success
                    resolve(this.response);
                } else {
                    // Something went wrong (404 etc.)
                    reject('error:' + this.status);
                }
            }
            request.onerror = function () {
                reject(new Error('XMLHttpRequest Error: '+this.statusText));
            };
            request.open('GET', url);
            request.send();
        });
}

//HttpReq = HttpReq.defaults({'proxy':'http://127.0.0.1:8888'});

function httprequest (url) {
    return new Promise(
        function (resolve, reject) {

            // if ('https://www.google.co.kr/?60' == url) resolve('forced error:' + url);

                console.log( dataFormat() + ' start:' + url);

                HttpReq.get(url)
                        .on('response', function(response) {

                            if (response.statusCode === 200)
                            {
                                console.log( dataFormat() + ' end:' + url);
                                resolve ('success:' + url);
                            }
                            else {
                                console.log( dataFormat() + ' end: error code:' + response.statusCode  + ':' + url);
                                resolve ('fail:' + response.statusCode  +  ' url:'+ url);
                            }

                        })
                        .on('error', function(response) {

                            resolve('err:' + response)

                        });
        });
}

// httprequest('https://www.google.co.kr/')
//         .then(r => { console.log('httprequest success:'); console.log(r)})
//         .catch (r => { console.log('httprequest fail:');  console.log(r)});


var fileUrls = Array(10);
for (var i=0;i<fileUrls.length;i++)
    //fileUrls[i] = 'http://localhost:8080/User/User/Get/10?' + i;
    // fileUrls[i] = 'http://172.18.176.189:8080/loyalty/v1/cash/buyercash/10005311?' + i;
    fileUrls[i] = 'http://127.0.0.1:8080/User/User/Get/10?' + i;


var promisedObjects = fileUrls.map(httprequest);

Promise.all(promisedObjects)
    .then(function (texts) {
        var cnt = 0;
        texts.forEach(function (text) {
            cnt ++;
        });
        console.log('total count:' + cnt);
    })
    .catch(function (reason) {
        console.log(reason);
    });

/*


//  httpGet 비동기
function samplePromise(url) {
    return new Promise(
        function (resolve, reject) {

            resolve('success:'+ url);
            reject('fail:'+ url);
        });
}


samplePromise('http://example.com/file.txt')
    .then(r => { console.log('####3'); console.log(r)})
    .catch (e => { console.log('####4');  console.log(e)});


*/




// javaScript 비동기 호출의 이해 end




function foo() {
    console.log('foo');
}

process.nextTick(foo);
console.log('bar');



function* increase() {
    for (var i = 0; i < 5; i++) {
        yield i;
    }
}

var index = increase();
console.log(index );
console.log(index.next());
console.log(index.next());
console.log(index.next());
console.log(index.next());
console.log(index.next());
console.log(index.next());

function loop() {
    for (var i = 0; i < 1000; i++) {
        // some cpu intensive work here
        //console.log(i);
    }
    console.log('done');
}

loop();

var func = () => ({foo:1});
console.log(func() );


// var async1 = function(param, callback) { callback(param*2); }
// var async2 = function(param, callback) { callback(param*3); }
// var async3 = function(param, callback) { callback(param*4); }
//
// var start = 1;
//
//
// async1(start, result => {
//     async2(result, result => {
//       async3(result, result => {
//         console.log(result); // 24
//         });
//       });
//   });


function async1 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*2);
    });
}
function async2 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*3);
    });
}
function async3 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*4);
    });
}

var start = 1;
async1(start)
    .then(async2)
    .then(async3)
    .then(result => {
    console.log(result); // 24
});

