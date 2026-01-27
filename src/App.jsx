import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux"
import { isAuthenticated, signIn, signOut, storeData } from './features/user/userSlice';
import SplashScreen from './components/SplashScreen'
import MainLayouts from './layouts/MainLayouts';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Reward from './pages/Reward';
import Educations from './pages/Education';
import Profile from './pages/Profile';
import Absents from './pages/Absents';
import DetailNews from './pages/News/detail';
import { getBiodata } from './utilities/sendRequest';
import DetailReward from './pages/Reward/detail';
import Points from './pages/Points';
import ToTop from './components/ToTop/ToTop';
import { isShowImage } from './features/image/imageSlice';
import ImageModal from './features/image/image';
import AttendanceModal from './features/attendance/attendance';
import OvertimeModal from './features/attendance/overtime';
import AbsentModal from './features/attendance/absent';
import MyRewards from './pages/MyRewards';
import AbsensiEvent from './pages/Events/absensi';
import ErrorNotFound from './pages/Errors/notFound';
import SuccessAbsensiEvent from './pages/Events/success';
import Overtimes from './pages/Absents/overtimes';
import Annuals from './pages/Absents/annuals';
import Sicks from './pages/Absents/sicks';
import Permissions from './pages/Absents/permissions';
import BusinessTrips from './pages/Absents/trips';
import { isShowAbsent, isShowAttendance, isShowClockOut, isShowOvertime, setClockIn, setClockOut } from './features/attendance/attendanceSlice';
import Attendances from './pages/Absents/attendances';
import { createTimeStamp, normalizeDateTimeFromDB } from './utilities/helpers';
import ClockOutModal from './features/attendance/clockOut';
import Informations from './pages/Informations';
import ConnectionModal from './features/connection/connection';
import DetailEducations from './pages/Education/detail';

function App() {
	const dispatch = useDispatch();
    const isShowModalImage = useSelector(isShowImage);
    const isShowModalAttendance = useSelector(isShowAttendance);
    const isShowModalClockOut = useSelector(isShowClockOut);
    const isShowModalOvertime = useSelector(isShowOvertime);
    const isShowModalAbsent = useSelector(isShowAbsent);
    const [splash, setSplash] = useState(false)
    const isLogged = useSelector(isAuthenticated);

	const [isOnline, setIsOnline] = useState(navigator.onLine);

	//buat useeffect untuk set redux attendance to null semua jika status out/IN dan tanggal/time out berbeda dengan time saat ini

    useEffect(() => {
        setSplash(true)
        setTimeout(() => {
            setSplash(false)
        }, 2000)

		const currentDate = new Date();
		if (localStorage.getItem('_AbHc')) {

			const token = decodeToken(localStorage.getItem('_AbHc'));
			
			if(token.exp * 1000 < currentDate.getTime()){
				dispatch(signOut())
			} else {
				fetchBiodata(token.nip)
				dispatch(signIn(token))
			}
		}

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isLogged])

	const fetchBiodata = async (nip) => {
        getBiodata(nip).then((res) => {
			const data = res.payload

			dispatch(storeData(data))
			
			if(data.Attendances.length > 0) {
				if(data.Attendances[0].clock_in) {
					dispatch(setClockIn({
						timestamp: createTimeStamp(data.Attendances[0].date, data.Attendances[0].clock_in),
						shift: data?.Biodata.Shift
					}))
				}
				if(data.Attendances[0].clock_out) {
					dispatch(setClockOut(createTimeStamp(data.Attendances[0].date_out, data.Attendances[0].clock_out)))
				}
			}
        }).catch(() => {
            console.log("failed to load biodata");
        })
	}

	useEffect(() => {
		const updateOnlineStatus = () => {
			setIsOnline(navigator.onLine);
		};
	
		// Tambahkan event listener untuk mendeteksi perubahan koneksi
		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);
	
		// Bersihkan event listener saat komponen unmount
		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, []);
	
	return (
		<>
			{isOnline ? null : <ConnectionModal /> }
			{isShowModalImage ? <ImageModal /> : null }
			{isShowModalAttendance ? <AttendanceModal /> : null }
			{isShowModalClockOut ? <ClockOutModal /> : null }
			{isShowModalOvertime ? <OvertimeModal /> : null }
			{isShowModalAbsent ? <AbsentModal /> : null }
			<ToTop />
			{splash 
				? <SplashScreen/> 
				: 
					<Router>
						<Routes>
							<Route element={isLogged ? <MainLayouts /> : <Login />} >
								<Route index path="/" element={<Dashboard />} />
								<Route path="/points" element={<Points />} />
								<Route path="/my-rewards" element={<MyRewards />} />
								<Route path="/news" element={<News />} />
								<Route path="/news/:slug" element={<DetailNews />} />
								<Route path="/rewards" element={<Reward />} />
								<Route path="/rewards/:id" element={<DetailReward />} />
								<Route path="/educations" element={<Educations />} />
								<Route path="/educations/:slug" element={<DetailEducations />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/absents" element={<Absents />} />
								<Route path="/attendances" element={<Attendances />} />
								<Route path="/overtimes" element={<Overtimes />} />
								<Route path="/annuals" element={<Annuals />} />
								<Route path="/sicks" element={<Sicks />} />
								<Route path="/permissions" element={<Permissions />} />
								<Route path="/trips" element={<BusinessTrips />} />
								<Route path="/informations" element={<Informations />} />
							</Route>
							<Route path="/login" element={isLogged  ? <Navigate to={"/"} /> : <Login />} />
							<Route path="/event/:slug" element={<AbsensiEvent />} />
							<Route path="/event/success" element={<SuccessAbsensiEvent />} />
							<Route path='/*' element={<ErrorNotFound />} />
						</Routes>
					</Router>
			}

			<ToastContainer />
		</>
	)
}

export default App
