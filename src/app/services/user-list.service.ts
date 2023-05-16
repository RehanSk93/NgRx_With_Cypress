import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState, getUserLoaded, getUserLoading, getUsers } from '../ngrx/reducer';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { combineLatest, take, Observable } from 'rxjs';
import { UserAddAction, UserDeleteAction, UserListRequestAction, UserListSuccessAction, UserUpdateAction } from '../ngrx/action/user-action';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private store: Store<RootReducerState>, private apiService: ApiService) {
  }

  getUserList(force = false): [Observable<boolean>, Observable<User[]>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ = this.store.select(getUsers);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new UserListRequestAction());
        this.apiService.getAllUser().subscribe(res => {
          this.store.dispatch(new UserListSuccessAction({ data: res }));
        }, error => {
          // this.store.dispatch(new UserListErrorAction());
        });
      }
    });
    return [loading$, getUserData$];
  }

  addUser(data: User) {
    this.store.dispatch(new UserAddAction({ data }));
  }
  
  deleteUser(id: number) {
    this.store.dispatch(new UserDeleteAction({ id }));
  }

  updatedUser(data: User) {
    this.store.dispatch(new UserUpdateAction({ data }));
  }
} 