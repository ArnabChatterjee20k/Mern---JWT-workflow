/// <reference types="Cypress" />
function typing_and_submit(word) {
    cy.get('[data-testid="name"]').type(word)
    cy.get('[data-testid="email"]').type(word)
    cy.get('[data-testid="password"]').type(word)
    cy.get('[data-testid="quote"]').type(word)
    cy.get('[data-testid="submit"]').click()
}
function clear_field(word) {
    cy.get('[data-testid="name"]').clear()
    cy.get('[data-testid="email"]').clear()
    cy.get('[data-testid="password"]').clear()
    cy.get('[data-testid="quote"]').clear()

    typing_and_submit(word)
}

describe('Registration test', () => {
    it('Registration + Dashboard working properly', () => {
        cy.visit("http://localhost:3000/")

        cy.contains("Register").should("exist").click()
        
        typing_and_submit("arnab")
        cy.contains("User already exists").should("exist")


        const new_user = Math.random().toString(36).substring(2, 7);
        clear_field(new_user)
    
        cy.url().should("include", "/dashboard",{timeout:4*1000})

        cy.get('[data-testid="updated_quote"]').should("have.text",`${new_user}`) // updated_quote is the same text that we have in the new_user

        //matching the input field text with the text in the quote
        cy.contains("your quote",{matchCase:false})
        cy.get('[data-testid="update_quote_field"]').type("arnab").then(()=>{
            cy.get('[data-testid="update_quote_button"]').click();
        })
        cy.get('[data-testid="update_quote_field"]').then((elem)=>{
            cy.log("Text In Updating Field",elem.val())

            cy.get('[data-testid="updated_quote"]').should("have.text",elem.val()).then((elem)=>{
                cy.log("Updated QUote",elem.text())
            })
        })
    });
})