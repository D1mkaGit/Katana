const timeout = 15000;

class CommonObjects {
    // TODO: can be extended from some basic Page Opbject
    emailInputWrapper() {
        return cy.get('.auth0-lock-input-email').find('.auth0-lock-input-wrap-with-icon');
    }

    // TODO: can be extended from some basic Page Opbject
    emailInput() {
        return cy.get('input[id=\'1-email\']');
    }

    // TODO: can be extended from some basic Page Opbject
    passwordInputWrapper() {
        return cy.get('.auth0-lock-input-password').find('.auth0-lock-input-wrap-with-icon');
    }

    // TODO: can be extended from some basic Page Opbject
    passwordInput() {
        return cy.get('input[name=\'password\']');
    }

    // TODO: can be extended from some basic Page Opbject
    submitButton() {
        return cy.get('.auth0-label-submit');
    }

    loading() {
        return cy.get('.auth0-loading-container .auth0-loading', { timeout: timeout });
    }

    
}

export default CommonObjects