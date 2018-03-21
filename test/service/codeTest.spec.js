'use strict'
import request from 'supertest';
import { expect } from 'chai';
import userProcess from '~/service/UserProcess'
import fetch from 'node-fetch';


describe('Code Test', () => {
    it ('datetime str format Test',()=>{

        const a = '2018-03-21T18:00';
        const b = '2018-03-21T08:38:56.298Z';

        const adate = new Date(a);
        console.log('Test Done' + adate);

    });


});



