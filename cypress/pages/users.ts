export class Users {

    navigateUserListPage() {
        cy.get(':nth-child(3) > .nav-link').click();
    }
    userList() {
        cy.window().then(w => {
            // @ts-ignore
            const store = w.store;
            let userActions: any[] = [];
            let userAction = 'user list request'
            store.actionsObserver.subscribe((res: any) => {
                userActions.push(res.type);
            });
            expect(userActions[0]).to.equal(userAction)
            console.log(userActions);
        })
    }

    addUser(name: string, email: string, phone: string) {
        cy.get('#name').type(name);
        cy.get('#email').type(email);
        cy.get('#phone').type(phone);
        cy.get('form.ng-dirty > .btn').click();

        cy.window().then(w => {
            // @ts-ignore
            const store = w.store;
            let userActions: any[] = [];
            let userAction = 'user add'
            store.actionsObserver.subscribe((res: any) => {
                userActions.push(res.type);
            });
            expect(userActions[0]).to.equal(userAction)
            console.log(userActions);
        })
    }


    editUser(name: string, email: string, phone: string) {
        cy.get(':nth-child(1) > :nth-child(4) > .btn').click();
        cy.get('#name').clear().type(name);
        cy.get('#email').clear().type(email);
        cy.get('#phone').clear().type(phone);
        cy.get('form.ng-dirty > .btn').click();

        cy.window().then(w => {
            // @ts-ignore
            const store = w.store;
            let userActions: any[] = [];
            let userAction = 'user update'
            store.actionsObserver.subscribe((res: any) => {
                userActions.push(res.type);
            });
            expect(userActions[0]).to.equal(userAction)
            console.log('User actions', userActions);
        })
    }

    deleteUser() {
        cy.wait(5000);
        cy.get(':nth-child(1) > :nth-child(5) > .btn').click();
        cy.window().then(w => {
            // @ts-ignore
            const store = w.store;
            let userActions: any[] = [];
            let userAction = 'user delete';
            store.actionsObserver.subscribe((res: any) => {
                userActions.push(res.type);
            });
            expect(userActions[0]).to.equal(userAction)
        })
    }
}


/*

*/ 