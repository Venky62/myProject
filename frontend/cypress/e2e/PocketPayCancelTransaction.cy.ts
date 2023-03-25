import { RobotHands, RobotEyes, Dependencies } from "../robots/pocketPay/RobotFramework";

const robotHands = new RobotHands();
const robotEyes = new RobotEyes();
const dependencies = new Dependencies();

describe('Visit PocketPay login page', () => {
  it('passes', () => {
    dependencies.visitPocketPay();
  })
})

describe('PocketPay login', () => {
  it('Select Email,Password and sign in ', () => {
    cy.fixture("example.json").then((data) => {
      const emailField = robotEyes.getElementEmailIdField();
      robotHands.typeDataIntoField(emailField, data.email);
      const passwordField = robotEyes.getElementPasswordField();
      robotHands.typeDataIntoField(passwordField, data.password);
      robotHands.waitForPageLoad()
    })
    const signInButton = robotEyes.getButtonElementWithText("Sign In");
    robotHands.clickElement(signInButton);
    robotEyes.seesPathNameInUrl('/home')
  })
})

describe('Click Transaction dropdown', () => {
  it('Dropdown and cancel ', () => {
    robotHands.waitForPageLoad()
    const lastCard = cy.get(':nth-child(2) > [data-testid="transaction-details-card"] > .css-1hm9ihh-MuiGrid-root > .css-1nhkijp-MuiGrid-root > [data-testid="iconComponent"] > img')
    robotHands.clickElement(lastCard);
    const cancelButton = robotEyes.getButtonElementWithText("Cancel the transfer");
    robotHands.clickElement(cancelButton);
    cy.fixture("example.json").then((data) => {
      const select1 = robotEyes.getElementWithDataTestId("select").eq(0)
      robotHands.typeDataIntoField(select1, data.select);
      const select2 = robotEyes.getElementWithDataTestId("select").eq(1)
      robotHands.typeDataIntoField(select2, data.select);
    })
    const cancelTransferButton = robotEyes.getButtonElementWithText("Cancel the transfer");

  })
})
