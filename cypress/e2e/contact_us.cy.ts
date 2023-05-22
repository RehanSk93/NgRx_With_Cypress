import { ContactUs } from "../pages/contact_us";
import { LoginPage } from "../pages/login_page";
const locator = require("../locator.json")

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
        cy.fixture("userForm").then((userData) => {
            cy.get(locator.formFieldSelector.form1).type(userData.username)
            cy.get(locator.formFieldSelector.form2).type(userData.email)
            cy.get(locator.formFieldSelector.form5).type(userData.comment)
            cy.get(locator.formFieldSelector.form6).select("mango").should("have.value", "mango")
            cy.get(locator.formFieldSelector.form7).type(userData.password)
            cy.get("#userFemale").check().should("be.checked")
            cy.get(".btn").click()   
        })
    })

    it.only("User form validation with invalid data", () => {
        cy.fixture("userForm").then((userData) => {
            cy.get(locator.formFieldSelector.form1).type(userData.username)
            cy.get(locator.formFieldSelector.form1).clear()
            cy.get(locator.formFieldSelector.form3).should( "have.text", " Username is required. ")

            cy.get(locator.formFieldSelector.form2).type(userData.email)
            cy.get(locator.formFieldSelector.form2).clear()
            cy.get(locator.formFieldSelector.form4).should( "have.text"," Email is required. ")
            cy.get(locator.formFieldSelector.form2).type("abcd")
            cy.get(locator.formFieldSelector.form4).should( "have.text"," Invalid email format. ")

            cy.get(locator.formFieldSelector.form5).type(userData.comment)
            
            cy.get(locator.formFieldSelector.form6).select("mango").should("have.value", "mango")
            
            cy.get(locator.formFieldSelector.form7).type(userData.password)
            cy.get(locator.formFieldSelector.form7).clear()
            cy.get(locator.formFieldSelector.form8).should( "have.text", " • Password is required. ")
            cy.get(locator.formFieldSelector.form7).type(userData.weakPass)
            cy.get(locator.formFieldSelector.form9).should( "have.text"," • Password should contain at least one uppercase letter and one lowercase letter. ")
            cy.get(locator.formFieldSelector.form12).should( "have.text","• Weak password")
            cy.get(locator.formFieldSelector.form7).clear()
            cy.get(locator.formFieldSelector.form7).type(userData.passLengthCheck)
            cy.get(locator.formFieldSelector.form9).should( "have.text"," • Password should not exceed 15 characters. ")
            cy.get(locator.formFieldSelector.form7).clear()
            cy.get(locator.formFieldSelector.form7).type(userData.strongPassword)
            cy.get(locator.formFieldSelector.form11).should( "have.text"," • Strong password ")
            
            cy.get("#userFemale").check().should("be.checked")
            cy.get(".btn").should("be.disabled")
            cy.reload()
            
        })
    })

});
