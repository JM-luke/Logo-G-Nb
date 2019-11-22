const Correo = require('../models/correo.model');
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
var HttpsProxyAgent = require('https-proxy-agent');
require ('isomorphic-fetch');
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
  let parms = { title: 'Home', active: { home: true } };
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  
  if (accessToken && userName) {
    parms.user = userName;
    parms.debug = `User: ${userName}\nAccess Token: ${accessToken}`;
  } else {
    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;
    /*
    console.log(' request ');
    request(parms.signInUrl, function(err, res, body){
      console.log(' request res' +res);
      console.log(' request body' +body);
    });
    */
  }
  return parms

}

async function authorize(req, res, next) {
   console.log('  AUTHORIZE');
}

async function getAll(req) {
  /* GET /mail */
  

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    let proxy = process.env.http_proxy || 'http://8980260:100tauro@proxy.adif.es:8080';
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
      .api('/me/mailfolders/inbox/messages')
      .top(10)
      .select('subject,from,receivedDateTime,isRead')
      .orderby('receivedDateTime DESC')
      .get();
      return result.value;

    } catch (err) {

      throw 'Error retrieving messages';
    } 
  } else {

    throw 'User not found';
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