import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLogged: [],
    userData: [],
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signIn: (state, action) => {
            state.userLogged = action.payload;
            state.isAuthenticated = true;
        },
        signOut: (state) => {
            state.userLogged = null;
            state.isAuthenticated = false;
            localStorage.clear();
        },
        storeData: (state, action) => {
            state.userData = action.payload;
        },

    },
})

export const { signIn, signOut, storeData } = userSlice.actions;
export default userSlice.reducer;

// selector
export const selectUser = state => state.user.userLogged
export const selectUserData = state => state.user.userData
export const isAuthenticated = state => state.user.isAuthenticated