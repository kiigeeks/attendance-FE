import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import AvatarIcon from '../../assets/icons/Male-User.svg'
import { selectUserData, signOut } from '../../features/user/userSlice'

const Header = () => {
    const userData = useSelector(selectUserData);
    const location = useLocation();
    const clickRef = useRef(null)
    const dispatch = useDispatch();
	const navigate = useNavigate();
	const [menuProfile, setMenuProfile] = useState(false)

    const [title, setTitle] = useState('');
    
    useEffect(() => {
        setTitle(getTitleFromPath(location.pathname))
        
    }, [location.pathname])

	useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setMenuProfile(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickRef])

    const getTitleFromPath = (pathname) => {
        if (pathname === '/news') {
          return 'News';
        } else if (pathname.startsWith('/news/')) {
          return 'Detail News';
        } else if (pathname === '/profile') {
          return 'Profile';
        } else if (pathname === '/') {
          return 'Dashboard';
        } else if (pathname === '/points') {
          return 'Point History';
        } else if (pathname === '/my-rewards') {
          return 'Reward History';
        } else if (pathname === '/rewards') {
          return 'Reward';
        } else if (pathname.startsWith('/rewards/')) {
          return 'Detail Reward';
        } else if (pathname === '/educations') {
          return 'Educations';
        } else if (pathname === '/absents') {
          return 'Pengajuan';
        } else if (pathname === '/overtimes') {
          return 'Lembur';
        } else if (pathname === '/annuals') {
          return 'Cuti';
        } else if (pathname === '/sicks') {
          return 'Sakit';
        } else if (pathname === '/permissions') {
          return 'Ijin';
        } else if (pathname === '/trips') {
          return 'Tugas Luar Kantor';
        } else if (pathname === '/attendances') {
          return 'Riwayat Kehadiran';
        } else if (pathname === '/informations') {
          return 'Informasi';
        } else {
          return '';
        }
    };
    
	const handlePoint = () => {
		navigate("/points")
		setMenuProfile(false)
	}

	const handleReward = () => {
		setMenuProfile(false)
		navigate("/my-rewards")
	}

	const handleAttendance = () => {
		setMenuProfile(false)
		navigate("/attendances")
	}

	const handleInformations = () => {
		setMenuProfile(false)
		navigate("/informations")
	}

	const handleLogout = () => {
		dispatch(signOut())
		navigate("/login")
		setMenuProfile(false)
	}
	
    return (
        <section className="mt-6 mb-0 md:mb-5 py-1 h-10 w-full flex items-center text-center justify-center relative">
            <span className="font-medium text-base tracking-wider">
                {title}
            </span>
            <button
				onClick={() => setMenuProfile(! menuProfile)}
				className="bg-white border border-white h-9 w-9 rounded-full absolute top-0 right-5 cursor-pointer shadow-md">
                {userData.photo
                    ?
                        <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${userData.photo}`} alt="user" className="w-full h-full object-cover rounded-full" />
                    :
                        <img src={AvatarIcon} loading="eager" alt="user" className="w-full h-full object-cover rounded-full" />
                }
            </button>

            <div 
				ref={clickRef}
				id="menu-profile"
				className={`${menuProfile ? "" : "hidden"} bg-white rounded-2xl shadow-2xl flex flex-col text-end gap-1 py-3 pl-10 pr-5 absolute top-[45px] right-5 max-w-[250px] z-50`}>
                <div className="flex flex-row justify-center items-center gap-2">
                    <div className="flex flex-col w-full">
                        <span className="text-sm font-semibold truncate">
							{userData.fullname}
                        </span>
                        <span className="text-sm font-light text-gray-600">{userData.nip}</span>
                    </div>
                </div>
                <hr className="w-[95%] self-center mt-3 mb-3" />
                <button onClick={handlePoint} className="text-sm text-end font-light cursor-pointer">Riwayat Point</button>
                <button onClick={handleReward} className="text-sm text-end font-light cursor-pointer">Riwayat Reward</button>
                <button onClick={handleAttendance} className="text-sm text-end font-light cursor-pointer">Riwayat Kehadiran</button>
                <button onClick={handleInformations} className="text-sm text-end font-light cursor-pointer">Informasi</button>
                <button onClick={handleLogout} className="text-sm text-end mt-3">Logout</button>
            </div>
        </section>
    )
}

export default Header