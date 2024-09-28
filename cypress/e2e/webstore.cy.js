'use strict';

describe('Webshop tests', () => {
    beforeEach('Open webshop', () => {
        cy.visit('');
    });
    
    it('Full business path', () => {
        const USERNAME = 'test@kea.dk';
        const PASSWORD = 'Test';

        /**
         *  Sign up
         */
        cy.get('#optSignup > a').click();
        cy.get('#txtEmail').type(USERNAME);
        cy.get('#txtPassword').type(PASSWORD);        
        cy.get('#txtRepeatPassword').type(PASSWORD);
        cy.get('#frmSignup input[type="submit"]').click();
        cy.on('window:alert', text => {
            expect(text).to.contains('successful');
        });

        /**
         *  Log in
         */
        cy.get('a[href="login.html"]').click();
        cy.get('#txtEmail').type(USERNAME);
        cy.get('#txtPassword').type(PASSWORD);        
        cy.get('#frmLogin input[type="submit"]').click();

        /**
         *  Add products to cart
         */
        const PRODUCT_T_SHIRT = 'Mens Casual Premium Slim Fit T-Shirts';
        const PRODUCT_SSD = 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s';

        cy.get('article').contains('h2', PRODUCT_T_SHIRT)
            .parents('article')
            .within(() => {
                cy.get('button').click();
            });

        cy.get('article').contains('h2', PRODUCT_SSD)
            .parents('article')
            .within(() => {
                cy.get('input[type="number"]').clear().type('2');
                cy.get('button').click();
            });

        /**
         *  Change product units in cart
         */
        cy.get('#optCart > a').click();
        cy.get('tr').contains('td.titleCell', PRODUCT_SSD)
            .parents('tr')
            .within(() => {
                cy.get('input[type="number"]').clear().type('3');
            });

        /**
         *  Check out
         */
        cy.get('#cart input[type="submit"]').click();

        const ADDRESS = 'Guldbergsgade 29N';
        const POSTAL_CODE = '2200';
        const CITY = 'Copenhagen';
        const CUSTOMER_NAME = 'Pernille L. Hansen';
        const CARD_EXPIRATION = '2027-12';
        const CVV = '666';

        cy.get('#txtDeliveryAddress').type(ADDRESS);
        cy.get('#txtDeliveryPostalCode').type(POSTAL_CODE);
        cy.get('#txtDeliveryCity').type(CITY);
        
        cy.get('#chkRepeat').click();

        cy.get('#txtCreditCardName').type(CUSTOMER_NAME);
        cy.get('#txtExpiryDate').type(CARD_EXPIRATION);
        cy.get('#txtCVV').type(CVV);

        cy.get('#checkout input[type="submit"]').click();

        /**
         *  Check that the cart is empty
         */
        cy.get('#optCart > a').click();

        cy.get('#alert section p').should('contain', 'empty');
        cy.get('#alert a[title="Close Alert"]').click();

        /**
         *  Log out
         */
        cy.get('#optLogout > a[title="Log out"]').click();

        cy.get('#optLogin > a[title="Log in"]').should('be.visible');
    });
});