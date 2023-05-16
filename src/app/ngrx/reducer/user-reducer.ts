import { User } from '../../models/user';
import { Action } from '../action';
import { USER_ADD, USER_DELETE, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE } from '../action/user-action';


export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  users: User[]
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  users: []
};


export function UserReducer(state = initialState, action: Action): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case USER_LIST_SUCCESS: {
      const updateUser = state.users.concat(action.payload.data);
      return { ...state, loading: false, loaded: true, users: updateUser }
    }
    case USER_ADD: {
      const users = state.users.concat(action.payload.data);
      console.log('add user', users);
      return {...state, ...{users}}
    }
    case USER_DELETE: {
      const id = action.payload.id;
      const users = state.users.filter(data => data.id !== action.payload.id);
      return {...state, ...{users}}
    }
    case USER_UPDATE: {
      let userData = [...state.users]
      let indexValue = userData.map(el => el.id).indexOf(action.payload.data.id);
      userData.splice(indexValue, 1, action.payload.data)
      return {...state, users: userData }
    }
    default: {
      return state;
    }
  }
}



// selectors
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;