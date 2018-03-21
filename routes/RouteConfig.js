import exam from './exam';
import index from './index';
import auths from './sv/auths';
import content from './sv/content';
import * as codes from '~/com/static/commonCode';



class RouteConfig  {

    static setRoutes(app){

        app.use('/', index);
        app.use('/exam', exam);
        app.use( codes.WEB_PROXY_PATH + '/Auths', auths);
        app.use( codes.WEB_PROXY_PATH + '/Content', content);
    }

}



export default (RouteConfig);