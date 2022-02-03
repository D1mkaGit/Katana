import LoginPage from "../PageObject/LoginPage";
import RegistrationPage from "../PageObject/RegistrationPage"

const defaultPassword = 'Qwerty!23';

function randomTextWithNumbers(length) {
  return randomCharacters(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

function randomNumbers(length) {
  return randomCharacters(length, '0123456789');
}

function randomCharacters(length, characters) {
  var result = '';
  var characters = characters;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function enterTextToInput(input, text) {
  input
      .click()
      .clear()
      .type(text);
}

describe('Register new user', () => {

  const registerPage = new RegistrationPage();

  it('Open Registration Page and check form', function () {
    registerPage.navigate();

    registerPage.registerForm().should('be.visible');

    registerPage.registerFormHeader()
      .should('be.visible')
      .should('have.text', 'Start with a free\n14-day trial');

    registerPage.registerFormDescription()
      .should('be.visible')
      .should('have.text', 'No credit card. No commitments.');

    registerPage.emailInputWrapper().should('be.visible');
    registerPage.emailInput().should('have.attr', 'placeholder', 'yours@example.com');

    registerPage.passwordInputWrapper().should('be.visible');
    registerPage.passwordInput().should('have.attr', 'placeholder', 'your password');

    registerPage.firstNameInput()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'First name');

    registerPage.lastNameInput()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Last name');

    registerPage.companyInput()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Company name');

    registerPage.phoneInput()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Phone number');

    registerPage.submitButton()
      .should('be.visible')
      .should('have.text', 'Start your trial');

  });


  it('Fill with correct data and submit Register new user form', function () {
    enterTextToInput(registerPage.emailInput(), randomTextWithNumbers(6) + "@test.ee");
    enterTextToInput(registerPage.passwordInput(), defaultPassword);
    enterTextToInput(registerPage.firstNameInput(), 'TestName');
    enterTextToInput(registerPage.lastNameInput(), 'TestSurname');
    enterTextToInput(registerPage.companyInput(), 'TestCompany');
    enterTextToInput(registerPage.phoneInput(), randomNumbers(10));
    registerPage.submitButton().click();

    registerPage.loading().should('not.exist');
    registerPage.registerForm().should('not.exist');

    cy.get('appcues-container[class*=ontop]', { timeout: registerPage.regPageDefaultTimeout() }).should('be.visible');

  });

  // TODO: need to solve problem with access to the inframe objects, after that next test can be finished

  // const getIframeDocument = () => {
  //   return cy
  //   .get('iframe')
  //   .its('0.contentDocument').should('exist')
  // }
  
  // const getIframeBody = () => {
  //   return getIframeDocument()
  //   .its('body').should('not.be.undefined')
  //   .then(cy.wrap)
  // }

  // it('Pass questionary', function () {
  //   getIframeBody().find('a').should('have.text','I am just looking around, I don\'t need any solution now').click;
  //   cy.get('a[data-attrs-event*="dont_manufacture"]').should('be.visible').click;
  //   cy.get('a[data-attrs-event*="revenue_prefer_not_toshare"]').should('be.visible').click;
  //   cy.get('a[data-attrs-event*="welcome_accounting_neither"]').should('be.visible').click;
  //   cy.get('a[data-attrs-event*="welcome_ecommerce-neither"]').should('be.visible').click;

  //   cy.get('appcues-container[class*=ontop]', { timeout: registerPage.regPageDefaultTimeout() }).should('not.exist');

  //   cy.get('span[aria-label="Close"]', { timeout: registerPage.regPageDefaultTimeout() }).should('be.visible').click;
  // });

  // it('Logout', function () {
  //   cy.get('div.sc-hKFxyN').should('be.visible').click;
  //   cy.get('#logout').should('be.visible').click;
  //   cy.url().should('eq', 'https://katanamrp.com');

  // });

});