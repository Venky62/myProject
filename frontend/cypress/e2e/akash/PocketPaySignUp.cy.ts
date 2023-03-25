import {
	Dependencies,
	RobotEyes,
	RobotHands,
} from '../../robots/pocketpay-akash/RobotFrameWork';
const robotEyes = new RobotEyes();
const robotHands = new RobotHands();
const dependencies = new Dependencies();

describe('Visit wise sign up page', () => {
	it('Visit page', () => {
		dependencies.visitWise();
	});
});

describe('Sign Up process entering account details', () =>{
	it('navigates to sign up page', () =>{
		robotHands.clickOnSignUpTextButton()
		robotHands.waitForPageLoad()
		robotEyes.seesPathNameInUrl("/signup")
	})
	it('Enter registering mail id and click on next',()=>{
		const emailField = robotEyes.getElementWithDataTestId("inputField")
		cy.fixture("fixtures.json").then((data) => {
            const emailField = robotEyes.getElementEmailIdField();
            robotHands.typeDataIntoField(emailField, data.creatingAccountMailId);
        })
		robotEyes.getButtonElementUsingButtonText("Next").click()
		robotEyes.seesPathNameInUrl("/registration")
	})
	it('Select business account type',()=>{
		robotHands.clickOnBusinessAccountCard()
	})
	it('Select country United Kingdom',()=>{
		const select = robotEyes.getElementWithDataTestId("select");
		cy.fixture("fixtures.json").then((data) => {
            robotHands.typeDataIntoField(select,data.select)
        })
		robotEyes.getButtonElementUsingButtonText("Continue").click()
	})
	it('Type phone number',()=>{
		const phoneInput = robotEyes.getElementWithDataTestId("phoneInput")
		cy.fixture("fixtures.json").then((data) => {
			robotHands.typeDataIntoField(phoneInput,data.mobileNumber)
        })
		robotEyes.getButtonElementUsingButtonText("Continue").click()
		const codeFIeld = robotEyes.getElementWithDataTestId("inputField")
		cy.fixture("fixtures.json").then((data) => {
			robotHands.typeDataIntoField(codeFIeld,data.verificationCode)
        })
		robotEyes.getButtonElementUsingButtonText("Submit").click()
	})
	it('Enter password',()=>{
		const passwordField = robotEyes.getElementWithDataTestId("inputField")
		cy.fixture("fixtures.json").then((data) => {
			robotHands.typeDataIntoField(passwordField,data.password)
        })
		robotEyes.getButtonElementUsingButtonText("Continue").click()
	})
    it('Select Business  ', () => {
        robotHands.waitForPageLoad();
        cy.fixture("fixtures.json").then((data) => {
            const businessField = robotEyes.getElementWithDataTestId("autocompleteComponent");
            robotHands.typeDataIntoField(businessField, data.business)
        })
        let continueButton = robotEyes.getButtonElementUsingButtonText("Confirm")
        robotHands.clickElement(continueButton)
        continueButton = robotEyes.getButtonElementUsingButtonText("Confirm")
        robotHands.clickElement(continueButton)
    })
	it('selecting your business catergory', () => {
        robotHands.waitForPageLoad();
        cy.fixture("fixtures.json").then((data) => {
            const categorySelect = robotEyes.getElementWithDataTestId("categoryAuto");
            robotHands.typeDataIntoField(categorySelect, data.category)
            robotEyes.getElementUsingText("Real estate or construction").click()
            const subCategorySelect = robotEyes.getElementWithDataTestId("subCategoryAuto");
            robotHands.typeDataIntoField(subCategorySelect, data.subCategory)
            robotEyes.getElementUsingText("Real estate sale, purchase and management").click()
            const sizeOfBusinessSelect = robotEyes.getElementWithDataTestId("businessSizeAuto");
            robotHands.typeDataIntoField(sizeOfBusinessSelect, data.range)
            robotEyes.getElementUsingText("50-100").click()
        })
        robotHands.clickElement(robotEyes.getButtonElementUsingButtonText("Continue"))
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
        robotHands.clickElement(robotEyes.getButtonElementUsingButtonText("Continue"))
        robotHands.waitForPageLoad();
        robotEyes.seesPathNameInUrl('/home')
    })
})