
describe("API Testing", () => {


    it("POST Call Testing", () => {
        
        cy.request(
            {
                method: "POST",
                url: "https://jsonplaceholder.typicode.com/users",
                body: {
                    username: "rehansk",
                    email: "rehan@gmail.com",
                    website: "www.hildegard.org"
                }
            }
        ).then((response) => {
            console.log("user response", response);
        })
    })

    it.only("Post API test using fixture", () => {
        
        cy.fixture("userForm").then((data) => {
            const userData = data;
            
            cy.request({
                method: "POST",
                url: "https://jsonplaceholder.typicode.com/users",
                body: userData
            }).then((res) => {
                expect(res.status).to.eq(201); // Check response using status code
                expect(res.body.username).to.eq(userData.username); // Check response using property value
                expect(res.body.email).to.eq(userData.email);  // Check response using property value
                
                // Check response using property
                expect(res.body).has.property("username", userData.username);  
                // Check response using property
                expect(res.body).to.have.property("email", userData.email);
            })
        })
    })




})