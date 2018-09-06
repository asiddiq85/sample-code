let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let jasmineReporters = require('jasmine-reporters');
var today = new Date(),
    timeStamp = (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) + '' : (today.getMonth() + 1) + '') +
    (today.getDate() < 10 ? '0' + today.getDate() + '' : today.getDate() + '') +
    (today.getFullYear()) + '' +
    (today.getHours() < 10 ? '0' + today.getHours() : today.getHours() + '') +
    (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes() + '') +
    (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds() + '');

var path = require('path');
var fs = require('fs-extra');
var folderDate = (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) + '-' : (today.getMonth() + 1) + '-')+
                 (today.getDate() < 10 ? '0' + today.getDate() + '-' : today.getDate() + '-') +
                 (today.getFullYear());
var folderTime = (today.getHours() < 10 ? '0' + today.getHours() + '-' : today.getHours() + '-') +
                 (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());

fs.ensureDir("./downloads");
var downloadPath = path.join(__dirname,'./downloads');

exports.config = {
    suites: {
        notification: 'specs/notification/*.js',
        roleAndPermission: 'specs/roles/*.js',
        regression: [
            'specs/broadcast/*.js',
            'specs/categories/*.js',
            'specs/connection/*.js',
            'specs/firm/*.js',
            'specs/gateways/*.js',
            'specs/groups/*.js',
            'specs/login/*.js',
            'specs/notification/*.js',
            'specs/privilege/*.js',
            'specs/productDoc/*.js',
            'specs/recordings/*.js',
            'specs/reports/*.js',
            'specs/SSO/*.js',
            'specs/support/*.js',
            'specs/users/*.js'
        ]
    },
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    ignoreUncaughtExceptions: true,
    specs: ['specs/firm/*.js'],
    allScriptsTimeout: 300000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 6000000, //increase the time to avoid async errors (milliseconds)
        print: function() {}
    },

    capabilities: {
        'browserName': 'chrome',
        'unexpectedAlertBehaviour': 'accept',
        'chromeOptions': {
            /*
            use the following line to run the tests in headless chrome mode; no chrome browser will open
            args: [ "--headless", "--disable-gpu", "--window-size=800x600" ],
             */

          prefs: {
            download: {
              'prompt_for_download': false,
              'default_directory': downloadPath,
              'directory_upgrade': true
            }
          }
        }
      },

    params: {
        targetURL: 'https://qa1-portal.xhoot.com/c9portal/#/',
        allowedIps: '209.66.96.50,86.125.112.197,95.76.222.161,86.125.115.49,209.66.96.50,10.0.0.40,209.66.96.57,144.121.106.34',
            user: {
                admin: process.env.ADMIN,
                adminPass: process.env.ADMINPASS,

                nonAdmin: process.env.NONADMIN,
                nonAdminPass: process.env.NONADMINPASS,

                pwdChangeUser: process.env.PWDCHNGUSR,
                pwdChangeUserPass: process.env.PWDCHNGUSRPASS,

                marketingUser: process.env.MARKETINGUSER,
                marketingUserPass: process.env.MARKETINGUSERPASS,

                regularUser: process.env.NONADMIN1,
                regularUserPass: process.env.NONADMINPASS1,

                testSSOUser: process.env.SSOUSER,
                testSSOUserPass: process.env.SSOUSERPASS,

                click2callUser: process.env.CLICK2CALLUSER,
                click2callUserPass: process.env.CLICK2CALLUSERPASS,

                regularUser1: process.env.REGULARUSER1,
                regularUserPass1: process.env.REGULARUSERPASS1,

                testSSOUser1: process.env.SSOUSER1,
                testSSOUser1Pass: process.env.SSOUSERPASS1,

                noRole: process.env.NOROLE,
                noRolePass: process.env.NOROLEPASS,

                salesUser: process.env.SALESUSER,
                salesUserPass: process.env.SALESUSERPASS,

                firmAdmin1: process.env.FIRMADMIN1,
                firmAdmin1Pass: process.env.FIRMADMINPASS1,

                firmAdmin2: process.env.FIRMADMIN2,
                firmAdmin2Pass: process.env.FIRMADMINPASS2,

                complianceUser: process.env.COMPLIANCEUSER,
                complianceUserPass: process.env.COMPLIANCEUSERPASS,

                testUser: process.env.TESTUSER,
                testUserPass: process.env.TESTUSERPASS,

                smtpPass: process.env.SMTPPASS
        }
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        fs.ensureDir('./reports'+ '/' +folderDate + '/' + folderTime + '/screenshots');

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'reports'+ '/' +folderDate + '/' + folderTime,
            filePrefix: 'xmlresults' + timeStamp
        }));

        jasmine.getEnv().addReporter({
            specDone: function(result) {
                if (result.status === 'failed') {
                    browser.getCapabilities().then(function(caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function(png) {
                            var stream = fs.createWriteStream('reports'+ '/' +folderDate + '/' + folderTime + '/screenshots/' + browserName + timeStamp + '-' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });

        browser.manage().window().maximize();
    },

    onComplete: function() {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();


        capsPromise.then(function(caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

            var HTMLReport = require('protractor-html-reporter');

            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: './reports'+ '/' + folderDate + '/' + folderTime,
                screenshotPath: './screenshots',
                testBrowser: browserName + timeStamp,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                filename: timeStamp + ' Test-Results'
            };

            new HTMLReport().from('reports'+ '/' +folderDate + '/' + folderTime + '/xmlresults' + timeStamp + '.xml', testConfig);
        });
    }

};
