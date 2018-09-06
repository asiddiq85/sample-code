var loginPage = require('../../pages/LoginPage.js');
var agreementPage = require('../../pages/AgreementPage.js');
var navigationBar = require('../../pages/Navigation.js');
var firmsPage = require('../../pages/FirmsPage.js');
var groupsPage = require('../../pages/GroupsPage.js');
var editFirmPage = require('../../pages/EditFirmPage.js');
var firmData = require('../../data/firmData.json');
var emailJournalData = require('../../data/emailJournal.json');
var emailJournalingPage = require('../../pages/EmailJournalingPage.js');
var addEmailJournalingPage = require('../../pages/AddEmailJournalingPage.js');
var firmName;


describe('Adding Email Journaling Archive ', function() {
    var login;
    var agree;
    var users;
    var navigation;
    var datestring;
    // var editFirm;
    var emailJourning;
    var addEmailJournaling;
    var EC = protractor.ExpectedConditions;
    var journalMailboxError = "Journal Mailbox must be valid email address";
    var addEmailJournalSuccess = "Email Journaling successfully added";
    var nameError = 'name is missing';
    var smtpError = 'smtp is not valid';
    var smtpEmpty = 'smtp is missing';
    var senderError = 'sender is missing';
    var toAddressError = 'toAddress is missing';
    var fromAddressError = 'fromAddress is missing';
    var retentionError = 'retention is not valid';
    var customEmailError = 'Custom sender must be a valid email address registered to c9tec.com';
    var userDefineHeaderError = "All headers must start with 'X-'";
    var duplicatedNameError = 'already exists';

    var addEmailJournal = new addEmailJournalingPage();
    let firms = new firmsPage();
    let editFirm = new editFirmPage();
    let manageEmailJournaling = new emailJournalingPage();

    beforeEach(function () {
        navigation.gotoFirms();
        // firms = new firmsPage();
        // firms.retrieveFirm(firmName);
        // firms.editFirm();
        // browser.waitForAngular();
        // editFirm = new editFirmPage();
        // editFirm.enableEmailJournalingClick();
        browser.waitForAngular();
    });

    beforeAll( () => {
        login = new loginPage();
        login.gotoLogin();
        login.loginWith(browser.params.user.admin, browser.params.user.adminPass);

        agree = new agreementPage();
        agree.acceptAgreement();

        navigation = new navigationBar();

        navigation.gotoFirms();
        firms = new firmsPage();

        // dateString = firms.addNewFirm();
        //
        // if (firmData.dateString == "yes") {
        //     firmName = firmData.firmName + " " + dateString;
        // } else {
        //     firmName = firmData.firmName;
        // }
    });

    fit('test', function () {
        console.log(firms.test());

    });

    it('@Sanity Open Email Journaling page will bring the user to page with url: "#/emailJournaling"', function() {
        browser.getCurrentUrl().then(function (currentUrl) {
            expect(currentUrl.endsWith("#/emailJournaling"));
        });
    });


    it('@Sanity PORTTEST- Journal mailbox is required', function() {
        manageEmailJournaling = new emailJournalingPage();
        manageEmailJournaling.clickAddEmailJournaling();
        addEmailJournal = new addEmailJournalingPage();
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(journalMailboxError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastSuccess()), 10000);
    });

    it("PORTTEST-705/PORTTEST-703, PORTTEST-707, PORTTEST-709, PORTTEST-710, PORTTEST-712, " +
        "PORTTEST-832/PORTTEST-704/PORTTEST-705/PORTTEST-710/PORTTEST-708/PORTTEST Adding information to-707/PORTTEST-702/PORTTEST-701" +
        " 'Journal mailbox', 'name', 'smtp host', 'cloud9 sender', 'email address', 'sender address with @c9tec', " +
        "'to address', 'from address', 'retention duration', 'header with X-' are required valid email address", function() {
        manageEmailJournaling = new emailJournalingPage();
        manageEmailJournaling.clickAddEmailJournaling();
        addEmailJournal = new addEmailJournalingPage();
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys("TEST");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(journalMailboxError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(nameError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys(emailJournalData.name);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(smtpEmpty);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys("10.10.");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(smtpError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(senderError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.setCloud9Sender("custom");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(customEmailError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.setCloud9Sender("custom");
        addEmailJournal.getCloud9SenderCustom().clear();
        addEmailJournal.getCloud9SenderCustom().sendKeys("c9tac@yahoo.com");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(customEmailError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(toAddressError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(fromAddressError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(retentionError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);
        addEmailJournal.getUserDefineHeader().sendKeys("Test test header");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(userDefineHeaderError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getUserDefineHeader().clear();
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys(emailJournalData.name);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);
        if (emailJournalData.authSmtp) {
            addEmailJournal.getAuthSmtp().click();
            addEmailJournal.getSmtpUsername().clear();
            addEmailJournal.getSmtpUsername().sendKeys(emailJournalData.smtpUsername);
            addEmailJournal.getSmtpPassword().clear();
            addEmailJournal.getSmtpPassword().sendKeys(browser.params.user.smtpPass);
            addEmailJournal.getSmtpConfirmPassword().clear();
            addEmailJournal.getSmtpConfirmPassword().sendKeys(browser.params.user.smtpPass);
        }

        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);

        addEmailJournal.setCloud9Sender("custom");
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.setCloud9Sender(emailJournalData.cloud9Sender);
        if (emailJournalData.cloud9Sender == "custom") {
            addEmailJournal.getCloud9SenderCustom().clear();
            addEmailJournal.getCloud9SenderCustom().sendKeys(emailJournalData.cloud9SenderCustom);
        }

        addEmailJournal.setToAddress("c9tec");
        addEmailJournal.setToAddress("recorded");
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.setFromAddress("c9tec");
        addEmailJournal.setFromAddress("recorded");
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.setRetentionDuration("30 Days");
        addEmailJournal.setRetentionDuration("90 Days");
        addEmailJournal.setRetentionDuration("180 Days");
        addEmailJournal.setRetentionDuration("1 Year");
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);

        if (emailJournalData.enforceTls) {
            addEmailJournal.getEnforceTLS().click();
        }

        for (i = 0; i < emailJournalData.userDefineHeader.length; i++) {
            addEmailJournal.getUserDefineHeader().sendKeys(emailJournalData.userDefineHeader[i]);
            addEmailJournal.clickAddHeader();
        }
        addEmailJournal.clickRemoveHeader();
        addEmailJournal.clickSave();

        expect(addEmailJournal.getToastMessage().getText()).toBe(addEmailJournalSuccess); //  Adding information to Add Email Journaling Page
        addEmailJournal.getToastSuccess().click();
        browser.wait(EC.invisibilityOf(manageEmailJournaling.getToastSuccess()), 10000);
        manageEmailJournaling.clickAddEmailJournaling();
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys(emailJournalData.name);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);

        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);
        addEmailJournal.clickSave();
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(manageEmailJournaling.getToastError()), 10000);
        addEmailJournal.clickCancel();
        manageEmailJournaling = new emailJournalingPage();
        manageEmailJournaling.retrieveEmailJournal(emailJournalData.name);

        manageEmailJournaling.clickEditEmailJournal();
        editEmailJournal = new addEmailJournalingPage();
        expect(editEmailJournal.getName().getAttribute('value')).toBe(emailJournalData.name);
        expect(editEmailJournal.getSmtpHostDomain().getAttribute('value')).toBe(emailJournalData.smtp);
        expect(editEmailJournal.getAuthSmtp().isSelected()).toBe(emailJournalData.authSmtp);
        if (emailJournalData.authSmtp) {
            expect(editEmailJournal.getSmtpUsername().getAttribute('value')).toBe(emailJournalData.smtpUsername);
        } else {
            expect(editEmailJournal.getSmtpUsername().isDisplayed()).toBe(emailJournalData.authSmtp);
            expect(editEmailJournal.getSmtpPassword().isDisplayed()).toBe(emailJournalData.authSmtp);
        }
        expect(editEmailJournal.getJournalMailbox().getAttribute('value')).toBe(emailJournalData.journalMailbox);
        expect(editEmailJournal.getCloud9Sender().getText()).toBe(emailJournalData.cloud9SenderCustom);
        expect(editEmailJournal.getToAddress().getText()).toBe(emailJournalData.toAddress);
        expect(editEmailJournal.getFromAddress().getText()).toBe(emailJournalData.fromAddress);
        expect(editEmailJournal.getRetentionDuration().getText()).toBe(emailJournalData.retentionDuration);
        expect(editEmailJournal.getEnforceTLS().isSelected()).toBe(emailJournalData.enforceTls);
        expect(editEmailJournal.getUserDefineHeaderCount()).toBe(emailJournalData.userDefineHeader.length);

        editEmailJournal.clickCancel();
        browser.waitForAngular();
    });

    xit('Journal mailbox is required valid email address', function() {
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys("TEST");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(journalMailboxError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('Name is required', function() {
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(nameError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('PORTTEST-705/PORTTEST-703 Smtp Host Domain is required valid IP address', function() {
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys(emailJournalData.name);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(smtpEmpty);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys("10.10.");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(smtpError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('@Sanity PORTTEST-707 Cloud9 Sender is requied', function() {
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(senderError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('Cloud9 Sender custom requires email address', function() {
        addEmailJournal.setCloud9Sender("custom");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(customEmailError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('@Sanity Cloud9 Sender custom requires email address with @c9tec.com', function() {
        addEmailJournal.setCloud9Sender("custom");
        addEmailJournal.getCloud9SenderCustom().clear();
        addEmailJournal.getCloud9SenderCustom().sendKeys("c9tac@yahoo.com");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(customEmailError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('To Address is required', function() {
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(toAddressError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('PORTTEST-709 From Address is required', function() {
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(fromAddressError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('PORTTEST-710 Retention Duratioin is required', function() {
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(retentionError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
    });

    xit('PORTTEST-712 User Denfine Header starts with X-', function() {
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);
        addEmailJournal.getUserDefineHeader().sendKeys("Test test header");
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toBe(userDefineHeaderError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(addEmailJournal.getToastError()), 10000);
        addEmailJournal.getUserDefineHeader().clear();
    });


    it("@Sanity PORTTEST-832/PORTTEST-704/PORTTEST-705/PORTTEST-710/PORTTEST-708/PORTTEST-707/PORTTEST-702/PORTTEST-701 Adding information to Add Email Journaling Page", function() {
        manageEmailJournaling = new emailJournalingPage();
        manageEmailJournaling.clickAddEmailJournaling();
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys("Test " + Math.floor(Math.random()*5678));
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);
        if (emailJournalData.authSmtp) {
            addEmailJournal.getAuthSmtp().click();
            addEmailJournal.getSmtpUsername().clear();
            addEmailJournal.getSmtpUsername().sendKeys(emailJournalData.smtpUsername);
            addEmailJournal.getSmtpPassword().clear();
            addEmailJournal.getSmtpPassword().sendKeys(browser.params.user.smtpPass);
            addEmailJournal.getSmtpConfirmPassword().clear();
            addEmailJournal.getSmtpConfirmPassword().sendKeys(browser.params.user.smtpPass);
        }
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);

        addEmailJournal.setCloud9Sender("custom");
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.setCloud9Sender(emailJournalData.cloud9Sender);
        if (emailJournalData.cloud9Sender == "custom") {
            addEmailJournal.getCloud9SenderCustom().clear();
            addEmailJournal.getCloud9SenderCustom().sendKeys(emailJournalData.cloud9SenderCustom);
        }

        addEmailJournal.setToAddress("c9tec");
        addEmailJournal.setToAddress("recorded");
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.setFromAddress("c9tec");
        addEmailJournal.setFromAddress("recorded");
        browser.wait(EC.visibilityOf(addEmailJournal.getRetentionDuration()), 10000);
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);
        if (emailJournalData.enforceTls) {
            addEmailJournal.getEnforceTLS().click();
        }

        for (i = 0; i < emailJournalData.userDefineHeader.length; i++) {
            addEmailJournal.getUserDefineHeader().sendKeys(emailJournalData.userDefineHeader[i]);
            addEmailJournal.clickAddHeader();
        }
        addEmailJournal.clickRemoveHeader();
        addEmailJournal.clickSave();

        expect(addEmailJournal.getToastMessage().getText()).toBe(addEmailJournalSuccess);
        addEmailJournal.getToastSuccess().click();
        browser.wait(EC.invisibilityOf(manageEmailJournaling.getToastSuccess()), 10000);
    });


    xit("Cannot save same name Email Journaling", function() {
        editFirm = new editFirmPage();
        manageEmailJournaling = new emailJournalingPage();
        manageEmailJournaling.clickAddEmailJournaling();
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys(emailJournalData.name);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);
        addEmailJournal.clickSave();
        navigation.gotoFirms();
        firms.retrieveFirm(firmName);
        firms = new firmsPage();
        firms.editFirm();
        browser.waitForAngular();
        editFirm = new editFirmPage();
        editFirm.enableEmailJournalingClick();
        browser.waitForAngular();
        manageEmailJournaling.clickAddEmailJournaling();
        addEmailJournal.getName().clear();
        addEmailJournal.getName().sendKeys(emailJournalData.name);
        addEmailJournal.getSmtpHostDomain().clear();
        addEmailJournal.getSmtpHostDomain().sendKeys(emailJournalData.smtp);
        addEmailJournal.getJournalMailbox().clear();
        addEmailJournal.getJournalMailbox().sendKeys(emailJournalData.journalMailbox);
        addEmailJournal.setCloud9Sender("c9tac@c9tec.com");
        addEmailJournal.setToAddress(emailJournalData.toAddress);
        addEmailJournal.setFromAddress(emailJournalData.fromAddress);
        addEmailJournal.setRetentionDuration(emailJournalData.retentionDuration);
        addEmailJournal.clickSave();
        expect(addEmailJournal.getToastMessage().getText()).toContain(duplicatedNameError);
        addEmailJournal.getToastError().click();
        browser.wait(EC.invisibilityOf(manageEmailJournaling.getToastError()), 10000);
        addEmailJournal.clickCancel();
    });


    xit('@Sanity Check saved data is correct', function() {

        editFirm = new editFirmPage();
        manageEmailJournaling.clickAddEmailJournaling();
        // manageEmailJournaling = new emailJournalingPage();
        // manageEmailJournaling.retrieveEmailJournal(emailJournalData.name);

        // manageEmailJournaling.clickEditEmailJournal();
        editEmailJournal = new addEmailJournalingPage();
        // wait(2000000);
        expect(editEmailJournal.getName().getAttribute('value')).toBe(emailJournalData.name);
        expect(editEmailJournal.getSmtpHostDomain().getAttribute('value')).toBe(emailJournalData.smtp);
        expect(editEmailJournal.getAuthSmtp().isSelected()).toBe(emailJournalData.authSmtp);
        if (emailJournalData.authSmtp) {
            expect(editEmailJournal.getSmtpUsername().getAttribute('value')).toBe(emailJournalData.smtpUsername);
        } else {
            expect(editEmailJournal.getSmtpUsername().isDisplayed()).toBe(emailJournalData.authSmtp);
            expect(editEmailJournal.getSmtpPassword().isDisplayed()).toBe(emailJournalData.authSmtp);
        }
        expect(editEmailJournal.getJournalMailbox().getAttribute('value')).toBe(emailJournalData.journalMailbox);
        expect(editEmailJournal.getCloud9Sender().getText()).toBe(emailJournalData.cloud9SenderCustom);
        expect(editEmailJournal.getToAddress().getText()).toBe(emailJournalData.toAddress);
        expect(editEmailJournal.getFromAddress().getText()).toBe(emailJournalData.fromAddress);
        expect(editEmailJournal.getRetentionDuration().getText()).toBe(emailJournalData.retentionDuration);
        expect(editEmailJournal.getEnforceTLS().isSelected()).toBe(emailJournalData.enforceTls);
        expect(editEmailJournal.getUserDefineHeaderCount()).toBe(emailJournalData.userDefineHeader.length);

        editEmailJournal.clickCancel();
        browser.waitForAngular();
    });


    afterAll( () =>{
        navigation.logOut();
    });

});
