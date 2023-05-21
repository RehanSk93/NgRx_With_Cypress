import { ContactUs } from "../pages/contact_us";
import { LoginPage } from "../pages/login_page";

const loginPage = new LoginPage();
const contactUs = new ContactUs();

interface userType {
    username: string,
    email: string,
    comment: string,
    password: string
}

describe("contactUs", () => {
    beforeEach(() => {
        loginPage.navigateURL("/login");
        loginPage.enterUserName("Rehan@gmail.com");
        loginPage.enterUserPassword("1234");
        loginPage.onSubmit();
        contactUs.navigateToContactUsPage();
    });
    it("User form validation with valid data", () => {
        cy.fixture("userForm").then((data) => {
            data.forEach((userData: userType) => {
                cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(userData.username)
                cy.get(":nth-child(1) > :nth-child(2) > .form-control").type(userData.email)
                cy.get(":nth-child(3) > .form-control").type(userData.comment)
                cy.get(":nth-child(2) > :nth-child(1) > .form-control").select("mango").should("have.value", "mango")
                cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(userData.password)
                cy.get("#userFemale").check().should("be.checked")
                cy.get(".btn").click()
            })
            
        })
    })

    it.only("User form validation with invalid data", () => {
        cy.fixture("userForm").then((userData) => {
            cy.get(":nth-child(1) > :nth-child(1) > .form-control").type(userData.username)
            cy.get(":nth-child(1) > :nth-child(1) > .form-control").clear()
            cy.get(":nth-child(1) > :nth-child(3) > div").should( "have.text", " Username is required. ")

            cy.get(":nth-child(1) > :nth-child(2) > .form-control").type(userData.email)
            cy.get(":nth-child(1) > :nth-child(2) > .form-control").clear()
            cy.get(".row > :nth-child(1) > :nth-child(2) > :nth-child(3) > div").should( "have.text"," Email is required. ")
            cy.get(":nth-child(1) > :nth-child(2) > .form-control").type("abcd")
            cy.get(".row > :nth-child(1) > :nth-child(2) > :nth-child(3) > div").should( "have.text"," Invalid email format. ")

            cy.get(":nth-child(3) > .form-control").type(userData.comment)
            
            cy.get(":nth-child(2) > :nth-child(1) > .form-control").select("mango").should("have.value", "mango")
            
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(userData.password)
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").clear()
            cy.get(".errorText > div").should( "have.text", " • Password is required. ")
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(userData.weakPass)
            cy.get(".errorText > :nth-child(1)").should( "have.text"," • Password should contain at least one uppercase letter and one lowercase letter. ")
            cy.get(".errorText > :nth-child(2)").should( "have.text","• Weak password")
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").clear()
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(userData.passLengthCheck)
            cy.get(".errorText > :nth-child(1)").should( "have.text"," • Password should not exceed 15 characters. ")
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").clear()
            cy.get(":nth-child(2) > :nth-child(2) > .form-control").type(userData.strongPassword)
            cy.get(":nth-child(2) > :nth-child(2) > :nth-child(4)").should( "have.text"," • Strong password ")
            
            cy.get("#userFemale").check().should("be.checked")
            cy.get(".btn").should("be.disabled")
            cy.reload()
            
        })
    })

});
