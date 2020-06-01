import * as auth from './user/auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');

// const selectUsers = (state: AppState) => state

export const selectErrorMessage = createSelector(
    selectAuthState,
    (selectAuthState: any) => selectAuthState.errorMessage
);
