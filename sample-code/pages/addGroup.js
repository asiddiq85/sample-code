var AddGroupPage = function() {
    var selectFirmBar = element(by.className('chosen-container chosen-container-single'));
    var firmBarSearch = element(by.xpath('//*[@id="ng-view"]/div/div/div/div/div/div/div/input'));
    //var firmBarSearch = element(by.className('chosen-search'));
    var groupNameField = element(by.model('group.groupName'));
    var communitySelector = element(by.model('group.communityId'));
    var viewGroupConnectionsButton = element.all(by.className('fa fa-connectdevelop')).first();
    var firstNameField = element(by.model('group.firstName'));
    var lastNameField = element(by.model('group.lastName'));
    var emailField = element(by.model('group.email'));

    var displayInCommYes = element(by.id('displayInCommYes'));
    var displayInCommFNo = element(by.id('displayInCommNo'));
    var displayInCompYes = element(by.id('displayInCompYes'));
    var displayInCompNo = element(by.id('displayInCompNo'));
    var defaultGroupYes = element(by.id('defaultGroupYes'));
    var defaultGroupNo = element(by.id('defaultGroupYes'));

    var street1Field = element(by.model('group.street1'));
    var street2Field = element(by.model('group.street2'));
    var cityField = element(by.model('group.city'));
    var stateField = element(by.model('group.state'));
    var zipField = element(by.model('group.zip'));
    var countryField = element(by.model('group.country'));
    var websiteField = element(by.model('group.website'));

    var descriptionField = element(by.model('group.description'));

    var displayAddrNo = element(by.id('displayAddrNo'));;
    var dispayAddrYes = element(by.id('displayAddrYes'));

    var addGroupButton = element.all(by.className('btn btn-primary')).first();
    var cancelButton = element.all(by.className('btn btn-white')).first();

    var toast_error = element(by.className('toast toast-error'));
    var toast_success = element(by.className('toast toast-success'));
    var toast_message = element(by.className('toast-message'));

    this.getToastSuccess = function() {
        return toast_success;
    };

    this.getToastMessage = function() {
        return toast_message.getText();
    };

    this.clickAddGroup = function() {
        addGroupButton.click();
    };

    this.getToastError = function () {
        return toast_error;
    };


    //    =============

    this.cancel = function() {
        cancelButton.click();
        browser.waitForAngular();
    }

    this.getDescription = function() {
        return descriptionField.getText();
    };

    this.setDescription = function(text) {
        descriptionField.sendKeys(text);
    };

    this.getStreet1Field = function() {
        return street1Field.getText();
    };

    this.getDisplayAddrNo = function() {
        displayAddrNo.click();
    };

    this.getDispayAddrYes = function() {
        dispayAddrYes.click();
    };

    this.getWebsiteField = function() {
        return websiteField.getText();
    };

    this.getZipField = function() {
        return zipField.getText();
    };

    this.getCountryField = function() {
        return countryField.getText();
    };

    this.getStateField = function() {
        return stateField.getText();
    };

    this.getCityField = function() {
        return cityField.getText();
    };

    this.getStreet1Field = function() {
        return street1Field.getText();
    };

    this.getStreet2Field = function() {
        return street2Field.getText();
    };

    this.getDefaultGroupNo = function() {
        return defaultGroupNo.click();
    };

    this.getDefaultGroupYes = function() {
        defaultGroupYes.click();
    };

    this.getDisplayInCompNo = function() {
        displayInCompNo.click();
    };

    this.getDisplayInCompYes = function() {
        displayInCompYes.click();
    };

    this.getDisplayInCommFNo = function() {
        displayInCommFNo.click();
    };

    this.getDisplayInCommYes = function() {
        displayInCommYes.click();
    };

    this.getEmail = function() {
        return emailField.getText();
    };

    this.getLastName = function() {
        return lastNameField.getText();
    };

    this.getFirstName = function() {
        return firstNameField.getText();
    };
    //    =============

    this.setDisplayAddrNo = function() {
        displayAddrNo.click();
    };

    this.setDispayAddrYes = function() {
        dispayAddrYes.click();
    };

    this.setWebsiteField = function(text) {
        websiteField.sendKeys(text);
    };

    this.setZipField = function(text) {
        zipField.sendKeys(text);
    };

    this.setCountryField = function(text) {
        countryField.sendKeys(text);
    };

    this.setStateField = function(text) {
        stateField.sendKeys(text);
    };

    this.setCityField = function(text) {
        cityField.sendKeys(text);
    };

    this.setStreet1Field = function(text) {
        street1Field.sendKeys(text);
    };

    this.setStreet2Field = function(text) {
        street2Field.sendKeys(text);
    };

    this.setDefaultGroupNo = function() {
        defaultGroupNo.click();
    };

    this.setDefaultGroupYes = function() {
        defaultGroupYes.click();
    };

    this.setDisplayInCompNo = function() {
        displayInCompNo.click();
    };

    this.setDisplayInCompYes = function() {
        displayInCompYes.click();
    };

    this.setDisplayInCommFNo = function() {
        displayInCommFNo.click();
    };

    this.setDisplayInCommYes = function() {
        displayInCommYes.click();
    };

    this.setEmail = function(text) {
        emailField.sendKeys(text);
    };

    this.setLastName = function(text) {
        lastNameField.sendKeys(text);
    };

    this.setFirstName = function(text) {
        firstNameField.sendKeys(text);
    };

    this.setCommunity = function(text) {
        if (text == -1) {
            //none
            communitySelector.$('[value="-1"]').click();
        } else if (text == 1) {
            //equities
            communitySelector.$('[value="1"]').click();
        } else if (text == 2) {
            //fixed income
            communitySelector.$('[value="2"]').click();
        } else if (text == 3) {
            //financial
            communitySelector.$('[value="3"]').click();
        } else if (text == 4) {
            //foreign exchange
            communitySelector.$('[value="4"]').click();
        }
    };

    this.setGroupName = function(text) {
        groupNameField.sendKeys(text);
    };

    this.selectAFirm = function(text) {
        selectFirmBar.click().then(function() {
            firmBarSearch.sendKeys(text);
            firmBarSearch.sendKeys(protractor.Key.ENTER);
        });
    };

    this.getFirstNameField = function () {
        return firstNameField;
    };

    this.getLastNameField = function () {
        return lastNameField;
    };

    this.getEmailField = function () {
        return emailField;
    };

    this.getDescriptionField = function () {
        return descriptionField;
    };

    this.getCommunityField = function () {
        return communitySelector;
    };

    this.getAddress1Field = function () {
        return street1Field;
    };

    this.getAddress2Field = function () {
        return street2Field;
    };

    this.getAddressCityField = function () {
        return cityField;
    };

    this.getAddressStateField = function () {
        return stateField;
    };

    this.getAddressZipField = function () {
        return zipField;
    };

    this.getAddressCountryField = function () {
        return countryField;
    };

    this.getGroupWebsiteField = function () {
        return websiteField;
    };



};

module.exports = AddGroupPage;
