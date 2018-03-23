'use strict'
import request from 'supertest';
import {stateFromMarkdown} from 'draft-js-import-markdown';
import {stateToHTML} from 'draft-js-export-html';

import fetch from 'node-fetch';


describe('Code Test', () => {
    it ('datetime str format Test',()=>{

        const a = '2018-03-21T18:00';
        const b = '2018-03-21T08:38:56.298Z';

        const adate = new Date(a);
        console.log('Test Done' + adate);

    });

    it ('markDown to html',()=>{

        const markDown = '# this **markd**own editer..&nbsp' ;


        let contentState = stateFromMarkdown(markDown);
        let html = stateToHTML(contentState);

        console.log(html);



    });


});




