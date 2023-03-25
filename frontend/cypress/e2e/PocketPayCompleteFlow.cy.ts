// <reference types="Cypress" />
import {
  RobotHands,
  RobotEyes,
  Dependencies,
} from "../robots/pocketPay/RobotFramework";

const robotHands = new RobotHands();
const robotEyes = new RobotEyes();
const dependencies = new Dependencies();

describe("Load login page", () => {
  it("passes", () => {
    dependencies.visitPocketPay();
    robotHands.waitForPageLoad();
  });
});

describe("Log into application", () => {
  it("Enter login information ", () => {

    cy.fixture("example.json").then((data) => {
      const emailField = robotEyes.getElementEmailIdField();
      robotHands.typeDataIntoField(emailField, data.email);
      const passwordField = robotEyes.getElementPasswordField();
      robotHands.typeDataIntoField(passwordField, data.password);
    })
   
    robotHands.waitForPageLoad();
    const signInButton = robotEyes.getButtonElementWithText("Sign In");
    robotHands.clickElement(signInButton);
    robotEyes.seesPathNameInUrl("/home");
  });
});

describe("Select new transaction", () => {
  it("Select Send money", () => {
    robotHands.waitForPageLoad();
    const sendButton = robotEyes.getButtonElementWithText("Send money");
    robotHands.clickElement(sendButton);
    robotHands.waitForPageLoad();
    robotEyes.seesPathNameInUrl("/send_money");
  });
  it("Select transaction amount and continue", () => {
    const sendMoneyCard = robotEyes.getSendMoneyCard();
    robotHands.clickElement(sendMoneyCard);
    robotHands.waitForPageLoad();
    robotEyes.seesPathNameInUrl("/transaction");
    const sendMoneyField = robotEyes.getElementById("sender-money-textfield");
    robotHands.typeDataIntoField(sendMoneyField, "2000");
    robotEyes.getElementWithDataTestId("iconComponent").eq(5).click();
    robotEyes.getElementUsingText("India").click();
    robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"));
  });
  it("Send money", () => {
    robotEyes.getElementUsingText("Business or Charity").click();
  });
  it("Select some one", () => {
    cy.fixture("example.json").then((data) => {
      const emailField = robotEyes.getElementEmailIdField();
      robotHands.typeDataIntoField(emailField, data.recipientMailId);
    })
    const checkBox = robotEyes.getElementWithDataTestId("checkboxComponent");
    robotHands.clickElement(checkBox);
    robotHands.waitForPageLoad();
    robotHands.waitForPageLoad();
    robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"));
  });
  it("Add purpose", () => {
    const select = robotEyes.getElementWithDataTestId("select");
    robotHands.typeDataIntoField(select, "AE");
    robotHands.waitForPageLoad();
    robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"));
  });
  it("Select Director", () => {
    robotHands.waitForPageLoad();
    robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"));
  });
  it("Select Owner", () => {
    robotHands.clickElement(robotEyes.getButtonElementWithText("Continue"));
  });
  it("Confirm pay", () => {
    robotHands.clickElement(
      robotEyes.getButtonElementWithText("Confirm and continue")
    );
  });
  it("Review details of your transfer", () => {
    robotHands.clickElement(
      robotEyes.getButtonElementWithText("Continue to pay")
    );
  });
  it("Selcect choose bank and pay", () => {
    robotEyes.getElementUsingText("Lloyds").click();
    robotHands.clickElement(
      robotEyes.getButtonElementWithText("Continue to pay")
    );
    robotHands.waitForPageLoad();
    robotEyes.getElementUsingText("Continue").click();
  });
  describe("PocketPay logout", () => {
    it("Click dropdown and logout ", () => {
      robotHands.waitForPageLoad();
      const avatarElement = robotEyes.getElementWithDataTestId("Avatar");
      robotHands.clickElement(avatarElement);
      robotHands.waitForPageLoad();
      const logout = robotEyes.getLogout();
      robotHands.clickElement(logout);
    });
  });
});
