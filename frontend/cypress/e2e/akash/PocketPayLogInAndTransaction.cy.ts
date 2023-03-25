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

describe('Sign Up process', () =>{
	it('Enter log in credentials', () => {
        cy.fixture('fixtures.json').then((data)=>{
            const emailField = robotEyes.getElementEmailIdField();
            robotHands.typeDataIntoField(emailField, data.email);
            const passwordField = robotEyes.getElementPasswordField();
            robotHands.typeDataIntoField(passwordField, data.password);
        })
        robotHands.waitForPageLoad()
        const signInButton = robotEyes.getButtonElementUsingButtonText("Sign In");
        robotHands.clickElement(signInButton);
        robotEyes.seesPathNameInUrl('/home')
    })
    it('Click on send money button', () => {
        robotHands.waitForPageLoad()
        const sendMoney = robotEyes.getButtonElementUsingButtonText("Send money");
        robotHands.clickElement(sendMoney);
        robotEyes.seesPathNameInUrl('/send_money')
    })
    it('Click on send money card', () => {
        robotHands.waitForPageLoad()
        robotEyes.getElementUsingText("Send Money").click();
        robotEyes.seesPathNameInUrl('/transaction')
    })
    it("enter sending amount and select countries", () => {
        robotHands.waitForPageLoad()
        const sendMoneyField = robotEyes.getElementById('sender-money-textfield')
        robotHands.typeDataIntoField(sendMoneyField, '2000');
        robotEyes.getElementWithDataTestId("iconComponent").eq(5).click()
        robotEyes.getElementUsingText("India").click()
        robotHands.clickElement(robotEyes.getButtonElementUsingButtonText("Continue"))
    })
    it("selecting business type", () =>{
        robotHands.waitForPageLoad()
        robotEyes.getElementUsingText("Business or Charity").click()
    })
    it("entering recipient mail id and clicking on check box", () => {
        robotHands.waitForPageLoad()
        cy.fixture('fixtures.json').then((data)=> {
        const recipientMailId =  robotEyes.getElementWithDataTestId("inputField").eq(0)
        robotHands.typeDataIntoField(recipientMailId, data.recipientMailId)});
        const checkBox = robotEyes.getElementWithDataTestId("checkboxComponent")
        robotHands.clickElement(checkBox)
        const continueButton = robotEyes.getButtonElementUsingButtonText("Continue");
        robotHands.clickElement(continueButton);
    })
    it("selecting purpose for transaction and clicking on continue for owners and directors", () => {
        robotHands.waitForPageLoad()
		const select = robotEyes.getElementWithDataTestId("select");
		robotHands.typeDataIntoField(select,"AE")
        let continueButton = robotEyes.getButtonElementUsingButtonText("Continue");
        robotHands.clickElement(continueButton);
        continueButton = robotEyes.getButtonElementUsingButtonText("Continue");
        robotHands.clickElement(continueButton);
        continueButton = robotEyes.getButtonElementUsingButtonText("Continue");
        robotHands.clickElement(continueButton);
    })
    it("confirm in review page", () =>{
        robotHands.waitForPageLoad()
        let confirmButton = robotEyes.getButtonElementUsingButtonText("Confirm and continue");
        robotHands.clickElement(confirmButton);
    })
    it("clicking on continue pay(bank transfer method)", () =>{
        let continueToPay = robotEyes.getButtonElementUsingButtonText("Continue to pay");
        robotHands.clickElement(continueToPay);
        robotEyes.getElementUsingText("Lloyds").click()
        continueToPay = robotEyes.getButtonElementUsingButtonText("Continue to pay");
        robotHands.clickElement(continueToPay);
        robotHands.waitForPageLoad();
        continueToPay = robotEyes.getButtonElementUsingButtonText("Continue").click();
        robotHands.waitForPageLoad();
        robotEyes.seesPathNameInUrl('/home')
    })
})
describe('Cancel the transaction', () => {
    it('Dropdown and cancel ', () => {
      robotHands.waitForPageLoad()
      const sendingTransactionDropDownIcon = cy.get(':nth-child(1) > [data-testid="transaction-details-card"] > .css-1hm9ihh-MuiGrid-root > .css-1nhkijp-MuiGrid-root > [data-testid="iconComponent"] > img')
      robotHands.clickElement(sendingTransactionDropDownIcon);
      const cancelButton = robotEyes.getButtonElementUsingButtonText("Cancel the transfer");
      robotHands.clickElement(cancelButton);
      const select1 = robotEyes.getElementWithDataTestId("select").eq(0)
      robotHands.typeDataIntoField(select1, 'AE');
      const select2 = robotEyes.getElementWithDataTestId("select").eq(1)
      robotHands.typeDataIntoField(select2, 'AE');
      const cancelTransferButton = robotEyes.getButtonElementUsingButtonText("Cancel transfer");
    robotHands.clickElement(cancelTransferButton)
    })
})
describe('logging out', () => {
    it('Click dropdown and logout ', () => {
      robotHands.waitForPageLoad()
      const avatarElement = robotEyes.getElementWithDataTestId("Avatar");
      robotHands.clickElement(avatarElement);
      robotHands.waitForPageLoad()
      const logoutButton = robotEyes.getLogoutButton();
      robotHands.clickElement(logoutButton)
    })
  })