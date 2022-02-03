import LoginPage from "../PageObject/LoginPage";

const defaultPassword = 'Qwerty!23';

function enterTextToInput(input, text) {
    input
        .click()
        .clear()
        .type(text);
}

function setupUserInOrder(name) {
    cy.get('div[ref="eCenterContainer"] div[row-id="0"]').click();
    enterTextToInput(cy.get('div[class*=soCustomer] input'), name);
    cy.get('div[class*=soCustomer] input').type('{enter}');
    cy.contains('span[data-testid="header-name-salesOrder"]', name);
    cy.get('div[class*=saving]').should('not.exist');
    cy.get('a[id="salesLink"]').click();
}

function checkInputForText(input, text) {
    cy.get(input, { timeout: 10000 }).should('have.text', text);
}

function checkInputForValue(input, value) {
    cy.get(input, { timeout: 10000 }).should('have.value', value);
}

function checkUserInOrderList(name) {
    checkInputForText('div[ref="eCenterContainer"] div[row-id="0"] div[col-id="customerName"] a', name);

}

describe('Using customers on Sales order', () => {
    const loginPage = new LoginPage();

    it('Login by already registered user', function () {
        loginPage.open();
        enterTextToInput(loginPage.emailInput(), "test003@test.ee");
        enterTextToInput(loginPage.passwordInput(), defaultPassword);
        loginPage.submitButton().click();

        loginPage.loading().should('not.exist');
    });

    it('Use already user in Order', function () {
        cy.get('div[ref="eCenterContainer"] div[row-id="0"] div[col-id="customerName"] a', { timeout: 10000 }).then(($customerNameDiv) => {
            if ($customerNameDiv.text() !== "Jane Rooms [DEMO]") {
                // revert back if something goes wrong as well chaking user chaning
                setupUserInOrder("Jane Rooms [DEMO]");
                checkUserInOrderList("Jane Rooms [DEMO]");
            } else {
                setupUserInOrder("Jack Carpets [DEMO]");
                checkUserInOrderList("Jack Carpets [DEMO]");
            }
        });
    });

    it('Use new user in Order', function () {
        const newUserName = "TestUser" + Math.random()
        setupUserInOrder(newUserName);
        checkUserInOrderList(newUserName);

        // revert back
        setupUserInOrder("Jane Rooms [DEMO]");
    });

    it('Adding customer address on Sales order', function () {
        //open customer form
        cy.get('div[ref="eCenterContainer"] div[row-id="1"]', { timeout: 10000 }).click();

        cy.get("body").then($body => {
            if ($body.find('div[data-testid="address-field-location"]').length > 0) {
                // open address form
                cy.get('div[data-testid="address-field-location"]').click();
                //remove address
                cy.get('button[id="removeAddress"]').click();
                // open address again
                cy.get('p[data-testid="address-field-new"]').click();
            } else {
                // open address form
                cy.get('p[data-testid="address-field-new"]').click();
            }
        });

        // enter existing address
        enterTextToInput(cy.get('input[name="line1"]'), "7 Peerti");
        checkInputForValue('input[name="line1"]', "7 Peerti");
        cy.get('li[role="option"]').first().click({ force: true });


        //cy.get('input[name="line1"]').type('{enter}');

        //check 
        checkInputForValue('input[name="city"]', 'Tallinn');
        checkInputForValue('input[name="state"]', 'Harju maakond');
        checkInputForValue('input[name="zip"]', '10411');
        checkInputForValue('input[name="country"]', 'Estonia');

        //save
        cy.get('button[id="submitButton"]').click();

        checkInputForText('div[data-testid="address-field-location"]', '7 Peetri, Tallinn, Harju maakond, 10411, Estonia')
        //Peetri 7, 10411 Tallinn

    });

    it('Removing customer address on Sales order', function () {
        
        // open address form
        cy.get('div[data-testid="address-field-location"]').click();
        //remove address
        cy.get('button[id="removeAddress"]').click();

        //check address is empty
        checkInputForText('p[data-testid="address-field-new"]', 'Enter address...');
    });
});
