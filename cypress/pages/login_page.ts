export class LoginPage {
    navigateURL(url: string) {
        cy.visit(url);
    }
    enterUserName(data: string){
        cy.get('#email').type(data)
    }
    enterUserPassword(data: string){
        cy.get('#pwd').type(data)
    }
    onSubmit(){
        cy.get('.btn').click()
    }
}