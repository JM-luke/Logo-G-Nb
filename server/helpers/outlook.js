
// const authHelper = require('./auth');
// const HttpsProxyAgent = require('https-proxy-agent');
// const request = require('request');

// module.exports.init = function(){
//     const authUrl = authHelper.getAuthUrl()
//     let proxy = process.env.http_proxy || process.env.PROXY;
//     let agent = new HttpsProxyAgent(proxy);
//     request({
//         uri: authUrl,
//         method: "GET",
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//         agent: agent,
//         timeout:  10000,
//         maxRedirects: 10,
//         body: ""
        
//     }, function(error, response, body){
//         console.log(`MSGraph URL: ${authUrl}`);
//         // console.log(`Error: \n\n\n ${error}`);
//         // console.log(`Response: \n\n\n ${response}`)
//         //console.log(`\n\n\nBody:  ${body}`);

//     });

// }