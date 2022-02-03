import CommonObjects from "./CommonObjects";
import HomePage from "./HomePage";

const commonObject = new CommonObjects();
const homePage = new HomePage();

class LoginPage{
    navigate() {
        homePage.navigate();
        // TODO: need to handle dropdown menu for small resolution tests
        cy.get(".header__auth > a", { timeout: 10000 }).should('be.visible').click();
    }

    open(){
        cy.visit('http://katanamrp.com/login');
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

    submitButton() {
        return commonObject.submitButton();
    }

    loading() {
        return commonObject.loading();
    }
}

export default LoginPage