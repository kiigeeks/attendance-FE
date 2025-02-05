import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    link: "", 
    isShowImage: false,
}

export const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {
        setImage: (state, action) => {
            state.link = action.payload;
            state.isShowImage = true;
        },
        resetImage: (state) => {
            state.link = null;
            state.isShowImage = false;
        },
    },
})

export const { setImage, resetImage } = imageSlice.actions;
export default imageSlice.reducer;

// selector
export const link = state => state.image.link
export const isShowImage = state => state.image.isShowImage