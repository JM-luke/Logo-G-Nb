try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}
exports.init = function () {
    console.log('Iniciando outlook salaIncidencias');
    var config = require('../config.json');
    const authHelper = require('./auth');
    var authUrl = authHelper.getAuthUrl();
    console.log(`Generated auth url: ${authUrl}`);

    const proxy = `${config.proxy.ip}:${config.proxy.port}`;
    const proxy_auth = `${config.proxy.user}:${config.proxy.pass}`;

    var spooky = new Spooky({

        child: {
            transport: 'http',
            proxy: proxy,
            'proxy-auth': proxy_auth
        },
        casper: {
            logLevel: 'debug',
            verbose: true,
            //waitTimeout: 6000,
            pageSettings: {
                loadImages: false,
                loadPlugins: false
            },
            useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            // viewportSize: {
            //     width: 1900,
            //     height: 1200
            // }
            //retryTimeout: 50,
            options: {
                clientScripts: ['/javascripts/jquery-1.12.3.min.js']
            }
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }
        
        spooky.start(authUrl);
       // spooky.open(authUrl);

        spooky.then([{ config: config }, function () {
            this.sendKeys('input#i0116', config.msgraph.cuenta);
        }]);
        spooky.thenClick('input#idSIButton9');
        spooky.waitForSelector('div#loginMessage.groupMargin');
        spooky.then([{ config: config }, function () {
            this.sendKeys('input#passwordInput', config.msgraph.pass);
        }]);
        spooky.thenClick('span#submitButton');
        spooky.waitForSelector('input#KmsiCheckboxField', function () {
            this.thenClick('input#idSIButton9');
        });
        /*
        spooky.waitFor(function () {
            return (this.getCurrentUrl().indexOf('/')) !== -1;
        });
        */

        spooky.run();
    });

    spooky.on('error', function (e, stack) {
        console.error(e);
        if (stack) {
            console.log(stack);
        }
    });

    // Uncomment this block to see all of the things Casper has to say.
    // There are a lot.
    // He has opinions.
    spooky.on('console', function (line) {
        console.log(line);
    });

    spooky.on('log', function (log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });

};