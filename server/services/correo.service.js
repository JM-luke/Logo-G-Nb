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

async function authorize(req, res, next) {
  
  
  // Get auth code
  const code = req.query.code;
  
  // If code is present, use it
  if (code) {
    try {
      //Introduce cookie en res
      await authHelper.getTokenFromCode(code, res);
      // Redirect to home
      console.log(`  AUTHORIZE CODE: ${code}`);
      //set(loopMSGraph(),60000);
      res.redirect('/#/');
    } catch (error) {
      throw {name: 'OutlookAuthError', message: `Error exchanging code for token\n error: ${ error }` };
    }
  } else {
    // Otherwise complain
    throw {name: 'OutlookAuthError', message: `Authorization error\n error: ${ status= 'Missing code parameter' }` };
  }
}

async function getAll(req, res) {
  /* GET /mail */
  
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  
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
      .api('/me/mailfolders/inbox/messages')
      .top(10)
      .select('subject,from,receivedDateTime,isRead')
      .orderby('receivedDateTime DESC')
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