import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    statusConnection: "Anda kembali Online",
    isShowConnection: false,
}

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: initialState,
    reducers: {
        showOffline: (state, action) => {
            state.statusConnection = action.payload;
            state.isShowConnection = true;
        },
        hiddenOffline: (state) => {
            state.statusConnection = null;
            state.isShowConnection = false;
        }
    },
})

export const { showOffline, hiddenOffline } = connectionSlice.actions;
export default connectionSlice.reducer;

// selector
export const statusConnection = state => state.connection.statusConnection
export const isShowConnection = state => state.connection.isShowConnection