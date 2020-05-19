import { AuthActionTypes, All } from './auth.actions';
import { User } from 'src/app/models/user';

export const USER_REDUCE_NODE = 'auth';

export interface State {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null
};

export const reducer = (state = initialState, action: All): State => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        errorMessage: null
      };
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
