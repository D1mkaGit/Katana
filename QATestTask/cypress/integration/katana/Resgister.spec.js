const loading = '.auth0-loading-container .auth0-loading';
const registerForm = 'form[class=auth0-lock-widget]';
const registerButtonTextLocator = '.hero__cta > .button > .button__inner > .button__text';
const registerPageTitleLocator = '.register__title';

const emailInput = 'input[id=\'1-email\']';
const passwordInput = 'input[name=\'password\']';

const fNameInput = 'input[id=\'1-first_name\']';
const lNameInput = 'input[id=\'1-last_name\']';
const companyInput = 'input[id=\'1-company\']';
const phoneInput = 'input[id=\'1-phone\']';
const submitButton = '.auth0-label-submit';

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


describe('Register new user', () => {
  beforeEach(() => {

  })

  afterEach(() => {

  })

  it('Open Registration Page and check form', function () {
    cy.visit('http://katanamrp.com/');
    cy.get(registerButtonTextLocator, { timeout: 10000 }).should('be.visible');
    cy.get(registerButtonTextLocator).should('have.text', 'Start a free 14-day trial*');

    cy.get(registerButtonTextLocator).click();
    cy.get
    //cy.get(loading).should('not.exist');
    cy.get(registerForm, { timeout: 10000 }).should('be.visible');
    

    cy.get(registerPageTitleLocator).find('h3').should('be.visible');
    cy.get(registerPageTitleLocator).find('h3').should('have.text', 'Start with a free\n14-day trial');
    cy.get(registerPageTitleLocator).find('p').should('be.visible');
    cy.get(registerPageTitleLocator).find('p').should('have.text', 'No credit card. No commitments.');

    cy.get('.auth0-lock-input-email').find('.auth0-lock-input-wrap-with-icon').should('be.visible');
    cy.get(emailInput).should('have.attr', 'placeholder', 'yours@example.com');

    cy.get('.auth0-lock-input-password').find('.auth0-lock-input-wrap-with-icon').should('be.visible');
    cy.get(passwordInput).should('have.attr', 'placeholder', 'your password');

    cy.get(fNameInput).should('be.visible');
    cy.get(fNameInput).should('have.attr', 'placeholder', 'First name');
    cy.get(lNameInput).should('be.visible');
    cy.get(lNameInput).should('have.attr', 'placeholder', 'Last name');
    cy.get(companyInput).should('be.visible');
    cy.get(companyInput).should('have.attr', 'placeholder', 'Company name');
    cy.get(phoneInput).should('be.visible');
    cy.get(phoneInput).should('have.attr', 'placeholder', 'Phone number');

    cy.get(submitButton).should('be.visible');
    cy.get(submitButton).should('have.text', 'Start your trial');

  });


  it('Fill with correct data and submit Register new user form', function () {
    cy.get(emailInput).type(randomTextWithNumbers(6) + "@test.ee");
    cy.get(passwordInput).type(defaultPassword);
    cy.get(fNameInput).type('TestName');
    cy.get(lNameInput).type('TestSurname');
    cy.get(companyInput).type('TestCompany');
    cy.get(phoneInput).type(randomNumbers(10));

    cy.get(submitButton).click();
    //cy.get(loading).should('not.exist');
    cy.get(registerForm, { timeout: 10000 }).should('not.exist');

    cy.get('appcues-container[class*=ontop]', { timeout: 15000 }).should('be.visible');

  });
});
