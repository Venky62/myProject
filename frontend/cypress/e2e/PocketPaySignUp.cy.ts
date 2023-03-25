import { RobotHands, RobotEyes, Dependencies } from "../robots/pocketPay/RobotFramework";

const robotHands = new RobotHands();
const robotEyes = new RobotEyes();
const dependencies = new Dependencies();

describe('Visit PocketPay Signup page', () => {
    it('passes', () => {
        dependencies.visitPocketPay();
        robotEyes.getElementUsingText("Sign up").click()
        robotEyes.seesPathNameInUrl('/signup')
    })
})

describe('Full Sign up details', () => {
    it('Enter email and continue', () => {
        robotHands.waitForPageLoad();
        cy.fixture("example.json").then((data) => {
            const emailField = robotEyes.getElementEmailIdField();
            robotHands.typeDataIntoField(emailField, data.newEmail);
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Next"));
    })
    it('Selcect account type and continue', () => {
        robotHands.waitForPageLoad();
        robotEyes.getElementUsingText("Business account").click()
    })
    it('Select country of registration', () => {
        cy.fixture("example.json").then((data) => {
            const select = robotEyes.getElementWithDataTestId("select");
            robotHands.typeDataIntoField(select, data.select)
        })
        robotHands.waitForPageLoad();
        robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"))
    })
    it('Enter number ', () => {
        cy.fixture("example.json").then((data) => {
            const phoneFiled = robotEyes.getElementWithDataTestId("phoneInput");
            robotHands.typeDataIntoField(phoneFiled, data.phone)
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"))
    })

    it('Enter 6digit code ', () => {
        cy.fixture("example.json").then((data) => {
            const codeField = robotEyes.getElementWithDataTestId("inputField");
            robotHands.typeDataIntoField(codeField, data.code)
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Submit"))
    })

    it('Enter Password  ', () => {
        cy.fixture("example.json").then((data) => {
            const passwordFiled = robotEyes.getElementWithDataTestId("inputField");
            robotHands.typeDataIntoField(passwordFiled, data.password)
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"))
    })

    it('Select Business  ', () => {
        robotHands.waitForPageLoad();
        cy.fixture("example.json").then((data) => {
            const select = robotEyes.getElementWithDataTestId("autocompleteComponent");
            robotHands.typeDataIntoField(select, data.business)
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Confirm"))
        robotHands.clickElement(robotEyes.getButtonElementWithText("Confirm"))
    })
    it('Select your Business catogory ', () => {
        robotHands.waitForPageLoad();
        cy.fixture("example.json").then((data) => {
            const select1 = robotEyes.getElementWithDataTestId("categoryAuto");
            robotHands.typeDataIntoField(select1, data.category)
            robotEyes.getElementUsingText("Real estate or construction").click()
            const select2 = robotEyes.getElementWithDataTestId("subCategoryAuto");
            robotHands.typeDataIntoField(select2, data.subCategory)
            robotEyes.getElementUsingText("Real estate sale, purchase and management").click()
            const select3 = robotEyes.getElementWithDataTestId("businessSizeAuto");
            robotHands.typeDataIntoField(select3, data.range)
            robotEyes.getElementUsingText("50-100").click()
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"))
    })

    it('Fill your detail', () => {
        robotHands.waitForPageLoad();
        cy.fixture("example.json").then((data) => {
            const firstName = robotEyes.getElementWithDataTestId("firstName");
            robotHands.typeDataIntoField(firstName, data.firstName)
            const lastName = robotEyes.getElementWithDataTestId("lastName");
            robotHands.typeDataIntoField(lastName, data.lastName)
            const selectedDate = robotEyes.getElementWithDataTestId("selectedDate");
            robotHands.typeDataIntoField(selectedDate, data.date)
            const select = robotEyes.getElementWithDataTestId("select");
            robotHands.typeDataIntoField(select, data.select)
            const homeAddress = robotEyes.getElementWithDataTestId("homeAddress");
            robotHands.typeDataIntoField(homeAddress, data.address)
            const city = robotEyes.getElementWithDataTestId("city");
            robotHands.typeDataIntoField(city, data.city)
            const pincode = robotEyes.getElementWithDataTestId("pincode");
            robotHands.typeDataIntoField(pincode, data.pincode)
        })
        robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"))
        robotHands.waitForPageLoad();
        robotEyes.seesPathNameInUrl('/home')
    })
})