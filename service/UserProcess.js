'use strict'
import fetch from 'node-fetch';
import axios from 'axios';
import * as codes from '~/com/static/commonCode';


class UserProcess {


    static updateUser = (memData) => {
      console.log('# updateUser #');
    };

    static findUserOne = (memData) =>{

            let userData = {provider :  memData.provider
                ,id : memData.id
            };

            console.log(userData);
            console.log(memData);
    };



    static addUser = (user,done) => {

        let userPost = {
            userNo: -1,
            userId: user.id,
            userNm: user.displayName,
            userPhotos: user.photos ,
            userProvider: user.provider,
            userStat: 'S1',
            createDt: new Date(),
            createNo: 999,
            //userDesc: user.accessToken
        };

        console.log('######################');
        console.log(user);
        if (user.provider === 'google'){
                if (user.photos ) { userPost.userPhotos =user.photos[0].value }

        }  else if (user.provider === 'naver') {
            if (user._json.profile_image)
            {
                userPost.userPhotos = user._json.profile_image;
            }
        }else if (user.provider === 'facebook') {

                userPost.userPhotos = 'http://graph.facebook.com/'+ user.id +'/picture?type=square';

        }


        console.debug('####call api');
        console.debug(JSON.stringify(user));
        console.debug(JSON.stringify(userPost));


        axios.post( codes.API_USER + '/AddUser' ,userPost)
            .then(res =>{
            console.error('>>> :');

            const data = {userHash:res.data.userHash};

            done(null, user,{ message:JSON.stringify(data) });
            }).catch(err => { console.error('>>>> :' + err); done(null, false, { message: err.message }); });


        // fetch( codes.API_ADDUSER, { method: 'POST'
        //                             , body: JSON.stringify(userPost)
        //                             , headers: { 'Accept': 'application/json','Content-Type': 'application/json'}
        //                             })
        //     .then(res => {
        //         // console.log(res.ok);
        //         // console.log(res.status);
        //         // console.log(res.statusText);
        //         // console.log(res.headers.raw());
        //         // console.log(res.headers.get('content-type'));
        //         return res.json()
        //         })
        //     .then(json => {
        //
        //         console.debug('#### UserProcess.AddUser');
        //         console.debug(JSON.stringify(json));
        //         done(null, user,{ message:JSON.stringify(json) });
        //     } )
        //     .catch(err => { console.error('>>>> :' + err); done(null, false, { message: err.message }); });
        //
        //

        return userPost;
    };



 }

 export  default  (UserProcess);

