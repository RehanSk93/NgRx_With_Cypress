import { ContactUs } from "../pages/contact_us";
import { LoginPage } from "../pages/login_page";

const loginPage = new LoginPage();
const contactUs = new ContactUs();

describe("contactUs", () => {
    beforeEach(() => {
        loginPage.navigateURL("/login");
        loginPage.enterUserName("Rehan@gmail.com");
        loginPage.enterUserPassword("1234");
        loginPage.onSubmit();
        contactUs.navigateToContactUsPage();
    });

    it.only("Email validation", () => {
        const email = "abcd@gmail.com"
        cy.get("#email").type(email)
    })
    it("Email validation", () => {
        const email = "abcd"
        cy.get("#email").type(email)
        cy.get("#emailInvalid").should("be.visible")
        cy.get("#emailInvalid").contains("Invalid email format.")
    })
    it("Email is required", () => {
        const email = "abcd"
        cy.get("#email").type(email)
        cy.get("#email").clear()
        cy.get("#emailRequired").should("be.visible")
        cy.get("#emailRequired").contains("Email is required.")
    })

});
