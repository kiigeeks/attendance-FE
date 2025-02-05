import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    timeIn: "", 
    timeOut: "", 
    statusAttendance: "",
    isShowAttendance: false,
    isShowClockOut: false,
    statusOvertime: "",
    isFetchOvertime: false,
    isShowOvertime: false,
    statusAbsent: "",
    isFetchAbsent: false,
    isShowAbsent: false,
}

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: initialState,
    reducers: {
        showOvertime: (state, action) => {
            state.statusOvertime = action.payload;
            state.isShowOvertime = true;
        },
        hiddenOvertime: (state) => {
            state.statusOvertime = null;
            state.isShowOvertime = false;
        },
        fetchOvertime: (state, action) => {
            state.isFetchOvertime = action.payload;
        },

        showAbsent: (state, action) => {
            state.statusAbsent = action.payload;
            state.isShowAbsent = true;
        },
        hiddenAbsent: (state) => {
            state.statusAbsent = null;
            state.isShowAbsent = false;
        },
        fetchAbsent: (state, action) => {
            state.isFetchAbsent = action.payload;
        },

        showAttendace: (state) => {
            state.isShowAttendance = true;
        },
        hiddenAttendace: (state) => {
            state.isShowAttendance = false;
        },
        setClockIn: (state, action) => {
            state.timeIn = action.payload;
            state.statusAttendance = "IN";
        },
        setClockOut: (state, action) => {
            state.timeOut = action.payload;
            state.statusAttendance = "OUT";
        },
        showClockOut: (state) => {
            state.isShowClockOut = true;
        },
        hiddenClockOut: (state) => {
            state.isShowClockOut = false;
        },
        resetAttendance: (state) => {
            state.timeIn = null;
            state.timeOut = null;
            state.statusAttendance = null;
            state.isShowAttendance = false;
        },
    },
})

export const { showAttendace, hiddenAttendace, setClockIn, setClockOut, resetAttendance, showOvertime, hiddenOvertime, fetchOvertime, showAbsent, hiddenAbsent, fetchAbsent, showClockOut, hiddenClockOut } = attendanceSlice.actions;
export default attendanceSlice.reducer;

// selector
export const timeIn = state => state.attendance.timeIn
export const timeOut = state => state.attendance.timeOut
export const statusAttendance = state => state.attendance.statusAttendance
export const isShowAttendance = state => state.attendance.isShowAttendance
export const statusOvertime = state => state.attendance.statusOvertime
export const isFetchOvertime = state => state.attendance.isFetchOvertime
export const isShowOvertime = state => state.attendance.isShowOvertime
export const statusAbsent = state => state.attendance.statusAbsent
export const isFetchAbsent = state => state.attendance.isFetchAbsent
export const isShowAbsent = state => state.attendance.isShowAbsent
export const isShowClockOut = state => state.attendance.isShowClockOut