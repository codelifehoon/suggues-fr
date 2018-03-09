var httpProxy = require('express-http-proxy');



function serverProxy() {
        this.initProxy =  function (url,app) {
                // app.use('/proxy',httpProxy('http://localhost:8080'));

                console.log("###initProxy :" + url);

                app.use('proxy', httpProxy(url, {
                            filter: function(req, res) {
                                console.log("### filter");
                                // if (req.url.indexOf('100') > -1 ) return false;
                                return true;
                            },
                            proxyReqPathResolver: function(req) {
                                console.log("### proxyReqPathResolver");
                                return require('url').parse(req.url).path;

                           }
                        })
                );
            }
}

module.exports = serverProxy;


