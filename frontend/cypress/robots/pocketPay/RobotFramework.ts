import { identity } from 'cypress/types/lodash';
import { BaseHands, BaseEyes, BaseDependencies } from '../BaseRobot';



export class Dependencies extends BaseDependencies {
    visitPocketPay() {
        this.accessUrl(Cypress.env('url'));
    }
}

export class RobotEyes extends BaseEyes {
    getElementWithDataTestId(dataTestId: string) {
        return cy.get(`[data-testid=${dataTestId}]`);
    }
    getElementWithDataTestIdWithTimeout(dataTestId: string) {
        return cy.get(`[data-testid=${dataTestId}]`, { timeout: 3000 });
    }
    getElementById(id: string) {
        return cy.get(`#${id}`)
    }
    getButtonElementWithText(text: string){
        const buttons = this.getElementWithDataTestId('button');
        return buttons.filter(`:contains("${text}")`)
    }
    getElementEmailIdField() {
        const inputs = this.getElementWithDataTestId('inputField')
        return inputs.filter(':contains("Email")')
    }
    getElementPasswordField() {
        return this.getElementWithDataTestId('password')
    }
    getLogout() {
        const iconTexts = this.getElementWithDataTestId('iconAndText');
        return iconTexts.filter(':contains("Logout")')
    }
    getSendMoneyCard() {
        const cards = this.getElementWithDataTestId('iconTextCardComponent');
        return cards.filter(':contains("Send Money")')
    }
    getElementUsingText(text: string){
        return cy.contains(text)
    }
    getElementDropdown() {
        const transactionCards = this.getElementWithDataTestId('transaction-details-card');
        return transactionCards
    }
}
export class RobotHands extends BaseHands {
    typeDataIntoField(id: Cypress.Chainable<JQuery<HTMLElement>>, data: string) {
        return id.type(`${data}{enter}`, { scrollBehavior: false });
    }
    clearTextField(id: Cypress.Chainable<JQuery<HTMLElement>>) {
        return id.clear()
    }
    clickElement(id: Cypress.Chainable<JQuery<HTMLElement>>) {
        return id.click({ scrollBehavior: false });
    }
    waitForPageLoad() {
        return cy.wait(3000);
    }
}