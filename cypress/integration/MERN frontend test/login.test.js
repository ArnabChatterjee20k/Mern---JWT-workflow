/// <reference types="Cypress" />
describe('first', () => { 
    it('Login + Dashboard working properly', () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Login").should("exist").click()
        cy.get('[data-testid="email"]').type("1234");
        cy.get('[data-testid="password"]').type("1234");
        cy.get('[data-testid="submit"]').click();

        // check if the dashboard component is displayed
        cy.url().should("include", "/dashboard",{timeout:4*1000})

        cy.contains("your quote",{matchCase:false})

        
        cy.get('[data-testid="update_quote_field"]').type("arnab").then(()=>{
            cy.get('[data-testid="update_quote_button"]').click();
        })

        //matching the input field text with the text in the quote
        cy.get('[data-testid="update_quote_field"]').then((elem)=>{
            cy.log("Text In Updating Field",elem.val())

            cy.get('[data-testid="updated_quote"]').should("have.text",elem.val()).then((elem)=>{
                cy.log("Updated QUote",elem.text())
            })

        })
    });
})