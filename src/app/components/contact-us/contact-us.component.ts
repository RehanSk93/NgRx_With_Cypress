import { Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

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
    checkboxLabels: string[] = ["HTML", "CSS", "JavaScript"];
    get f() { return this.contactUs.controls;}
    get checkboxArray() {
        return this.contactUs.get("checkboxes") as FormArray;
    }
    constructor() {
        this.contactUs = new FormGroup({
            username: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            comment: new FormControl("", [Validators.required, Validators.minLength(16)]),
            fruits: new FormControl("orange", [Validators.required]),
            password: new FormControl("", [
                Validators.required, 
                Validators.minLength(6),
                Validators.maxLength(15),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/),
                this.passwordStrengthValidator()
            ]),
                
            gender: new FormControl("male", [Validators.required]),
            checkboxes: new FormArray([])
        })
        this.addCheckboxes()
    }

    passwordStrengthValidator() {
        return (control: any) => {
            const value = control.value;
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);
    
            const isStrongPassword = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    
            if (!isStrongPassword && value) {
                return { weak: true };
            }
            return null;
        };
    }
    
    onSubmit() {
        console.log("Value", this.contactUs.value);
        this.contactUs.reset();
    }
    addCheckboxes() {
        this.checkboxLabels.forEach(() => {
            this.checkboxArray.push(new FormControl(false));
        });
    }

}
