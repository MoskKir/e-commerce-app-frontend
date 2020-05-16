import * as auth from './user/auth.reducers';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};
