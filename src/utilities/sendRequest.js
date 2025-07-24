import axios from 'axios';
let token = localStorage.getItem('_AbHc');

export const loginUser = async (credentials) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/users/employee/login`, credentials)

    token = data.payload.accessToken;
    return data;
}

export const getBiodata = async (paramsNip) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/users/${paramsNip}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// educations
export const getEducations = async (lastID, limit, key) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/educations/scroll?lastID=${lastID}&limit=${limit}&key=${key}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const getEducation = async (paramsSlug) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/educations/${paramsSlug}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const createRequestEducation = async (reqData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/education_requests`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const joinEducation = async (reqData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/user_educations`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const getComments = async (lastID, limit, paramsId, link) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/${link}=${paramsId}&lastID=${lastID}&limit=${limit}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const createComment = async (reqData, link) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/${link}`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const deleteComment = async (paramsId, link) => {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_BASE_URL_SERVER}/${link}/${paramsId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// news
export const getNews = async (keyword, lastID, limit) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/posts/scroll?key=${keyword}&lastID=${lastID}&limit=${limit}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const getDetailNews = async (paramsSlug) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/posts/${paramsSlug}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

//rewards
export const getRewards = async (keyword, lastID, limit) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/rewards/scroll?key=${keyword}&lastID=${lastID}&limit=${limit}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const getDetailReward = async (paramsID) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/rewards/${paramsID}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

//birthday
export const getBirhdays = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/users/employees/birthday`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// points
export const getLogPoints = async (lastID, limit, paramsNIP) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/point_logs/${paramsNIP}?lastID=${lastID}&limit=${limit}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// redeem
export const redeemReward = async (paramsID) => {
    const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL_SERVER}/points/redeem/${paramsID}`, "", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// my rewards
export const getLogRewards = async (lastID, limit, paramsNIP) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/reward_logs/user/${paramsNIP}?lastID=${lastID}&limit=${limit}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

//change password
export const changePassword = async (paramsNIP, reqData) => {
    const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL_SERVER}/users/employee/password/${paramsNIP}`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

//absensi event
export const absensiEvent = async (paramsSlug, reqData) => {
    const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL_SERVER}/points/join/${paramsSlug}`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// add lembur/tugas luar kota
export const createOvertime = async (reqData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/overtimes`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// overtimes
export const getOvertimes = async (lastID, limit, type) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/overtimes/user/?lastID=${lastID}&limit=${limit}&type=${type}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}


// add absent (sakit, ijin, cuti)
export const createAbsent = async (reqData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/absences`, reqData, {
        headers:{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// absents
export const getAbsents = async (lastID, limit, type) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/absences/user/?lastID=${lastID}&limit=${limit}&type=${type}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// attendance
export const clockInAttendance = async (reqData) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL_SERVER}/attendances`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export const clockOutAttendance = async (paramsNIP, reqData) => {
    const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL_SERVER}/attendances/${paramsNIP}`, reqData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// attendances
export const getAttendances = async (lastID, limit, paramsNIP) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/attendances/user/?lastID=${lastID}&limit=${limit}&nip=${paramsNIP}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

//location
export const getDetailLocation = async (lat, long) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_PUBLIC_URL_LOCATION}?format=json&lat=${lat}&lon=${long}`)
    return data;
}

// informations
export const getInformations = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_SERVER}/informations`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}