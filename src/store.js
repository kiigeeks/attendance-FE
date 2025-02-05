import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import imageSlice from './features/image/imageSlice';
import attendanceSlice from './features/attendance/attendanceSlice';
import { connectionSlice } from './features/connection/connectionSlice';


export default configureStore({
    reducer: {
        user: userSlice,
        image: imageSlice,
        attendance: attendanceSlice,
        connection: connectionSlice,
    }
});