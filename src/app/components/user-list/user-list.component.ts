import { Component } from '@angular/core';
import { FormGroup, FormControl,  Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  isEdit: boolean = false;
  editUserID: any;
  userForm: FormGroup;
  users: User[] = [];

  constructor(private userListService: UserListService, private store: Store<any>) {
    // @ts-ignore
    if(window.Cypress){
      // @ts-ignore
      window.store = this.store;
    }


    
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    })
   }


  ngOnInit() {
    this.fetchData();
    
  }

  fetchData() {
    const userData$ = this.userListService.getUserList()[1];
    userData$.subscribe(data => {
      this.users = data;
    })

  }

  editUser(user: User) {
    this.isEdit = true;
    this.editUserID = user.id;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
  }
  userUpdatedValue() {
    let updatedValue = {...this.userForm.value, id: this.editUserID}
    this.userListService.updatedUser(updatedValue);
    this.userForm.reset();
    this.isEdit = false
  }

  onSubmit() {
    console.log('add user details', this.userForm.value);
    this.userListService.addUser(this.userForm.value);
    this.userForm.reset();
  }

  deleteUser(id: number) {
    this.userListService.deleteUser(id);
  }
}
