import CommonObjects from "./CommonObjects";
import HomePage from "./HomePage";


const registerButtonTextLocator = '.hero__cta > .button > .button__inner > .button__text';
const registerPageTitleLocator = '.register__title';

const homePage = new HomePage();
const commonObject = new CommonObjects();
const timeout = 15000;

class RegistrationPage {
    regPageDefaultTimeout() {
        return timeout;
    }

    navigate() {
        homePage.navigate();
        cy.get(registerButtonTextLocator, { timeout: timeout }).should('be.visible');
        cy.get(registerButtonTextLocator).click();
    }

    registerForm() {
        return cy.get('form[class=auth0-lock-widget]', { timeout: timeout });
    }

    registerFormHeader() {
        return cy.get(registerPageTitleLocator).find('h3');
    }

    registerFormDescription() {
        return cy.get(registerPageTitleLocator).find('p');
    }

    emailInputWrapper() {
        return commonObject.emailInputWrapper();
    }

    emailInput() {
        return commonObject.emailInput();
    }

    passwordInputWrapper() {
        return commonObject.passwordInputWrapper();
    }

    passwordInput() {
        return commonObject.passwordInput();
    }

    firstNameInput() {
        return cy.get('input[id=\'1-first_name\']');
    }

    lastNameInput() {
        return cy.get('input[id=\'1-last_name\']');
    }

    companyInput() {
        return cy.get('input[id=\'1-company\']');
    }

    phoneInput() {
        return cy.get('input[id=\'1-phone\']');
    }

    submitButton() {
        return commonObject.submitButton();
    }

    loading() {
        return commonObject.loading();
    }
}

export default RegistrationPage