import { identity } from 'cypress/types/lodash';
import { BaseHands, BaseEyes, BaseDependencies } from '../BaseRobot';

export class Dependencies extends BaseDependencies {
	visitWise() {
		this.accessUrl(Cypress.env('url'));
	}
}

export class RobotEyes extends BaseEyes {
    getElementWithDataTestId(dataTestId: string) {
		return cy.get(`[data-testid=${dataTestId}]`);
	}
	getElementWithDataTestIdWithTimeout(dataTestId:string) {
		return cy.get(`[data-testid=${dataTestId}]`, {timeout: 3000});
	}
	getElementById(id: string) {
		return cy.get(`#${id}`)
	}
	getSignUpTextButtonElement(){
		return cy.contains("Sign up", {timeout: 3000})
	}
	getButtonElementUsingButtonText(buttonText: string) {
		return cy.get(`[data-testid=button]`).contains(buttonText);
	}
	getElementUsingText(text:string){
		return cy.contains(text)
	}
	getElementEmailIdField() {
        const inputs = this.getElementWithDataTestId('inputField')
        return inputs.filter(':contains("Email")')
    }
    getElementPasswordField() {
        return this.getElementWithDataTestId('password')
    }
	getLogoutButton() {
        const iconTexts = this.getElementWithDataTestId('iconAndText');
        return iconTexts.filter(':contains("Logout")')
    }
}

export class RobotHands extends BaseHands {
	clickElement(id: Cypress.Chainable<JQuery<HTMLElement>>) {
		return id.click({ scrollBehavior: false });
	}
	typeDataIntoField(id: Cypress.Chainable<JQuery<HTMLElement>>, data: string) {
		return id.type(`${data}{enter}`, { scrollBehavior: false});
	}
	clearTextField(id: Cypress.Chainable<JQuery<HTMLElement>>) {
		return id.clear()
	}
	scrollToCenter() {
		return cy.scrollTo(0, 600, { ensureScrollable: false });
	}

	scrollToBottom() {
		return cy.scrollTo('bottom', { ensureScrollable: false });
	}

	scrollToTop() {
		return cy.scrollTo('top', { ensureScrollable: false });
	}

	waitForPageLoad() {
		return cy.wait(3000);
	}
	clickOnSignUpTextButton(){
		cy.contains(`Sign up`,{timeout:4000}).click()
	}
	clickOnBusinessAccountCard() {
		cy.contains('Business account').click()
	}
}
