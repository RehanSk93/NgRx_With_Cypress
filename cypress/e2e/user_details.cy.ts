import { LoginPage } from "../pages/login_page";
import { Users } from "../pages/users";

const loginPage = new LoginPage();
const usersDetails = new Users();

describe("UserService", () => {
    beforeEach(() => {
        loginPage.navigateURL("/login");
        loginPage.enterUserName("Rehan@gmail.com");
        loginPage.enterUserPassword("1234");
        loginPage.onSubmit();
    });

    it("userList", () => {
        usersDetails.navigateUserListPage();
        usersDetails.userList();
    })

    it("addUser", () => {
        const userName = "Rehan Sk";
        const email = "rehan@gmail.com";
        const phone = "234-564-224";

        // Navigate to user tab
        usersDetails.navigateUserListPage();
        usersDetails.addUser(userName, email, phone);
    })

    it("editUser", () => {
        const userName = "Azam Sk";
        const email = "azam@gmail.com";
        const phone = "564-234-224";

        // Navigate to user tab
        usersDetails.navigateUserListPage();
        usersDetails.editUser(userName, email, phone);
    })

    it.only("deleteUser", () => {
    // Navigate to user tab
        usersDetails.navigateUserListPage();
        usersDetails.deleteUser();
    })

});
