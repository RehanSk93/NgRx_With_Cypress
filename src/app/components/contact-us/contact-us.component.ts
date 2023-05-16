import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-contact-us",
    templateUrl: "./contact-us.component.html",
    styleUrls: ["./contact-us.component.css"]
})
export class ContactUsComponent {

    contactUs:FormGroup;

    fruitsList: any[] = [
        { value: "orange", label: "Orange" },
        { value: "mango", label: "Mango" },
        { value: "banana", label: "Banana" }
    ];

    get f() { return this.contactUs.controls;}

    constructor() {
        this.contactUs = new FormGroup({
            username: new FormControl(""),
            email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            comment: new FormControl(""),
            fruits: new FormControl(""),
            password: new FormControl(""),
        })
    }
    
    onSubmit() {
        console.log("Value", this.contactUs.value);
    }

}
