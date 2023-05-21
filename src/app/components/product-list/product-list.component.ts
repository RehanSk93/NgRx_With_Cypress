import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { UserListService } from "src/app/services/user-list.service";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit{

    users: User[] = [];
    constructor(private userListService: UserListService) { }
    ngOnInit(){
        this.fetchData();
    }
  
    fetchData() {
        const userData$ = this.userListService.getUserList()[1];
        userData$.subscribe(data => {
            this.users = data;
        })

    }
}
