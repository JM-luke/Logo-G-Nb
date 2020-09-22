const Correo = require('../models/correo.model');
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
var HttpsProxyAgent = require('https-proxy-agent');
require ('isomorphic-fetch');
require('dotenv').config();
var request = require('request');

module.exports = {

  getAuthUrl,
  authorize,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAuthUrl(req, res) {
  let parms = {};
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  
  if (accessToken && userName) {
    parms.user = userName;
    parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
  } else {
    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;  
  }
  return parms
}

let token;
let gettingMessages = false;

async function authorize(req, res, next) {  
  // Get auth code
  const code = req.query.code;
  
  // If code is present, use it
  if (code) {
    try {
      token = await authHelper.getTokenFromCode(code, res);
      if(!gettingMessages){
        let result = await getMessagesDelta('/me/mailfolders/inbox/messages/delta');
        
      }
      res.redirect('/#/');

    } catch (error) {
      throw {name: 'OutlookAuthError', message: `Error exchanging code for token\n error: ${ error }` };
    }
  } else {
    // Otherwise complain
    throw {name: 'OutlookAuthError', message: `Authorization error\n error: ${ status= 'Missing code parameter' }` };
  }
}

// function link(result){
//   const odata = result;
//   let nextLink;
//   let deltaLink;
//   while (odata.hasOwnProperty('@odata.nextLink')) {
//     //processMessages();
//     nextLink = odata['@odata.nextLink'];
//     console.log(`nextLink ${nextLink}`);
//     try {
//       // Get the 10 newest messages from inbox
//       odata = await client
//         .api(nextLink)
//         .top(2)
//         //.select('subject,from,receivedDateTime,isRead')
//         .select('subject,sender,isRead')
//         .orderby('receivedDateTime DESC')
//         .get();
//       console.log('Result');
//       console.log(odata);
//     } catch (err) {
//       throw { name: 'OutlookAuthError', message: `Error retrieving messages ${err.message}` };
//     }
//   }
//   if(odata.hasOwnProperty('@odata.deltaLink')) {
//     deltaLink = odata['@odata.deltaLink'];
//     console.log(`deltaLink ${deltaLink}`)
//     interval(getMessagesDelta,60000,1,deltaLink);
//   }
// }


function interval(func, wait, times, link) {
  var interv = function (w, t) {
    return function () {
      if (typeof t === "undefined" || t === null || t-- > 0) {
        setTimeout(interv, w);
        try {
          func.call(null, link);
        }
        catch (e) {
          t = 0;
          throw e.toString();
        }
      }
    };
  }(wait, times);
  setTimeout(interv, wait);
};


async function getMessagesDelta(odataLink){
  // Renovar token //////////////////////////////////////////
  try {
    let newToken = await authHelper.getAccessToken(token);
    token = newToken;
    gettingMessages = true;
  } catch (error) {
    console.log('error:'+error);
  }
  //////////////////////////////
  const accessToken = token.access_token
  const userName = token.user_name;
  // GET /mail /delta
  if (accessToken && userName) {
    let proxy = process.env.http_proxy || process.env.PROXY;
    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
      fetchOptions: { agent: new HttpsProxyAgent(proxy) }
    });
    
  ////////////////////////////////////////////////////////////
    try {
      // Get the 10 newest messages from inbox
      const result = await client
      .api(odataLink)
      .top(2)
      //.select('subject,from,receivedDateTime,isRead')
      .select('subject,sender,isRead')
      .orderby('receivedDateTime DESC')
      .get();
      console.log('Result');
      console.log(result);
      
      
    } catch (err) {
      throw { name: 'OutlookAuthError', message: `Error retrieving messages ${err.message}` };
    }
    //link(result);
    let odata = result;
    let nextLink;
    let deltaLink;
    while (odata.hasOwnProperty('@odata.nextLink')) {
      //processMessages();
      nextLink = odata['@odata.nextLink'];
      console.log(`nextLink ${nextLink}`);
      try {
        // Get the 10 newest messages from inbox
        odata = await client
          .api(nextLink)
          .top(2)
          //.select('subject,from,receivedDateTime,isRead')
          .select('subject,sender,isRead')
          .orderby('receivedDateTime DESC')
          .get();
        console.log('Result');
        console.log(odata);
      } catch (err) {
        throw { name: 'OutlookAuthError', message: `Error retrieving messages ${err.message}` };
      }
    }
    if (odata.hasOwnProperty('@odata.deltaLink')) {
      deltaLink = odata['@odata.deltaLink'];
      console.log(`deltaLink ${deltaLink}`)
      interval(getMessagesDelta, 60000, 1, deltaLink);
    }





  } else {
    throw { name: 'OutlookAuthError', message: `User not found` };
  }
}

async function getAll(req, res) {
  // GET /mail
  console.log('GETALL');
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  console.log('acceessToken'+ accesstoken);
  console.log('GETALL'+userName);
  if (accessToken && userName) {
    let proxy = process.env.http_proxy || process.env.PROXY ;
    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
      fetchOptions: { agent: new HttpsProxyAgent(proxy) }
    });

    try {
      // Get the 10 newest messages from inbox
      const result = await client
      .api('/me/mailfolders/inbox/messages/delta')
      .top(10)
      //.select('subject,from,receivedDateTime,isRead')
      .select('subject,sender,isRead')
      //.orderby('receivedDateTime DESC')
      .get();
      return result.value;
    } catch (err) {
      throw {name: 'OutlookAuthError', message: `Error retrieving messages ${err.message}` };
    } 
  } else {
    throw {name: 'OutlookAuthError', message: `User not found` };
  }
}

async function getById(id) {

}

async function _delete(id) {

}

async function create(userParam) {

}

async function update(id, sub, userParam){

}