const timeout = 15000;

class CommonObjects {
    emailInputWrapper() {
        return cy.get('.auth0-lock-input-email').find('.auth0-lock-input-wrap-with-icon');
    }

    emailInput() {
        return cy.get('input[id=\'1-email\']');
    }

    passwordInputWrapper() {
        return cy.get('.auth0-lock-input-password').find('.auth0-lock-input-wrap-with-icon');
    }

    passwordInput() {
        return cy.get('input[name=\'password\']');
    }

    submitButton() {
        return cy.get('.auth0-label-submit');
    }

    loading() {
        return cy.get('.auth0-loading-container .auth0-loading', { timeout: timeout });
    }

    
}

export default CommonObjects