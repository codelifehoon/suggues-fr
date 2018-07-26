'use strict';


export const COOKIE_DOMAIN = process.env.NODE_ENV === 'production' ?  '.gokgok.net' : 'localhost';

export const WEB_URL = process.env.NODE_ENV === 'production' ?  'https://gokgok.net' : 'http://localhost:3000';
export const WEB_PROXY_PATH = process.env.NODE_ENV === 'production' ?  '/sv' : '/sv';

export const NODE_URL = process.env.NODE_ENV === 'production' ?  'https://service.gokgok.net' : 'http://localhost:7070';
export const NODE_SERVER_PORT = process.env.NODE_ENV === 'production' ?  '80' : '7070';

export const API_URL = process.env.NODE_ENV === 'production' ?  'https://api.gokgok.net' : 'http://127.0.0.1:8080';
export const API_USER = API_URL + '/User/V1';
