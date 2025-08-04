import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import Modal from '../../components/Modal'
import { hiddenClockOut, setClockOut } from './attendanceSlice'
import { MdDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { createTimeStamp, dateIndoNow } from '../../utilities/helpers';
import { clockOutAttendance, getDetailLocation } from '../../utilities/sendRequest';
import { selectUserData } from '../user/userSlice';


const ClockOutModal = () => {
    const userData = useSelector(selectUserData);
    const clickRef = useRef(null)
	const dispatch = useDispatch();
    const [time, setTime] = useState('');
    const [isReady, setIsReady] = useState(true)
    const [location, setLocation] = useState('Lokasi tidak ditemukan');
    const [retryCount, setRetryCount] = useState(0);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [markerPosition, setMarkerPosition] = useState([lat, lng]);

    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZoneName: 'short' // Menampilkan singkatan zona waktu
        };
        const formatter = new Intl.DateTimeFormat('id-ID', options);
        setTime(formatter.format(now));
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Perbarui setiap menit

        return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                dispatch(hiddenClockOut())
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

    useEffect(() => {
        fetchMyLocation()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchGetDetailLocation = async (lati, longi) => {
        // getDetailLocation(lati, longi).then((res) => {
        //     setLocation(`${res.address.village}, ${res.address.city_district}, ${res.address.city}`)
        // }).catch((err) => {
        //     console.log(err);
        // })
        try {
            const res = await getDetailLocation(lati, longi);
            if (res.address) {
                setLocation(
                    `${res.address.village}, ${res.address.city_district}, ${res.address.city}`
                );
            } else {
                toast.error('Location details not found', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                throw new Error('Location details not found');
            }
        } catch (err) {
            console.log(err);
    
            // Retry logic jika lokasi belum ditemukan
            if (retryCount < 5) { // Maksimal 5 kali percobaan
                setRetryCount((prev) => prev + 1);
                setTimeout(() => {
                    fetchGetDetailLocation(lati, longi);
                }, 3000); // Tunggu 3 detik sebelum mencoba lagi
            } else {
                toast.error('Unable to fetch location details after multiple attempts', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    }

    const fetchMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                
                setLat(latitude);
                setLng(longitude);
                setMarkerPosition(`${latitude}, ${longitude}`);
                fetchGetDetailLocation(latitude, longitude);
            },(error) => {
                toast.error('Unable to retrieve your location', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
                console.log(error);
                
            },{
                enableHighAccuracy: true,  // Meminta akurasi yang lebih tinggi
                timeout: 10000,  // Timeout maksimal 10 detik
                maximumAge: 0,  // Selalu ambil data lokasi terbaru
            });
        } else {
            toast.error('Geolocation is not supported by your browser', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    }
    
    const handleClockOut = (e) => {
        e.preventDefault();
        setIsReady(false)

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; 
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');

        const reqData = new FormData();
        reqData.append("clock_out", `${hours}:${minutes}:${seconds}`);
        reqData.append("meta_out", markerPosition);
        reqData.append("location_out", location);

        if (lat === "" || lng === "" || location === "Lokasi tidak ditemukan") {
            toast.error("Mohon coba refresh lagi", {
                position: "top-right",
                autoClose: 3000
            });
            fetchMyLocation();
            setIsReady(true)
            return; 
        }

        clockOutAttendance(userData.nip, reqData).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            
            dispatch(setClockOut(createTimeStamp(formattedDate, `${hours}:${minutes}:${seconds}`)))
            dispatch(hiddenClockOut())
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsReady(true)
        })
    }


    return (
        <Modal>
            <div ref={clickRef} className='fixed bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col gap-10 justify-center items-center'>
                <div className="flex flex-col gap-10 rounded-2xl w-[95vw] md:w-[500px] px-7 py-5 md:py-7 bg-white">
                    <div className='flex flex-row justify-between font-poppins text-sm '>
                        <div className='flex flex-row gap-1 justify-center items-center'>
                            <MdDateRange className='text-bluePrimary w-5 h-5' />
                            <span>{dateIndoNow()}</span>
                        </div>
                        <div className='flex flex-row gap-1 justify-center items-center'>
                            <MdAccessTime className='text-bluePrimary w-5 h-5' />
                            <span>{time}</span>
                        </div>
                    </div>
                    <form onSubmit={handleClockOut} className='flex flex-col gap-7 justify-center items-center'>
                        <h3 className='font-poppins font-medium text-base tracking-wide'>Apakah Anda yakin?</h3>

                        {lat === "" || lng === "" || location === "Lokasi tidak ditemukan"
                            ? <span className='text-sm italic font-light text-red-500'>*Lokasi Anda tidak terdeteksi oleh sistem, silahkan klik buton Check My Location</span>
                            : ""
                        }
                        
                        <div className='flex flex-row gap-3 justify-center items-center w-full'>
                            <button
                                onClick={() => dispatch(hiddenClockOut())}
                                className={`flex flex-row justify-center items-center gap-2 w-fit bg-redPrimary text-white cursor-pointer font-poppins text-xs rounded-full px-8 py-2`}>
                                <span>Tidak</span>
                            </button>
                            {lat === "" || lng === "" || location === "Lokasi tidak ditemukan"
                                ?
                                    <button
                                        onClick={fetchMyLocation}
                                        className={`flex flex-row justify-center items-center gap-2 w-fit bg-greenPrimary text-white cursor-pointer font-poppins text-xs rounded-full px-8 py-2`}>
                                        <span>Cek Lokasi Saya</span>
                                    </button>
                                :
                                    <button type='submit'
                                            disabled={!isReady}
                                            className={`flex flex-row justify-center items-center gap-2 w-fit ${isReady ? 'border border-redPrimary text-redPrimary cursor-pointer' : 'text-gray-800 bg-gray-300 cursor-wait'} font-poppins text-xs rounded-full px-5 py-2`}>
                                        <span>Absen Pulang</span>
                                        <MdLogout className='w-5 h-5'/>
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ClockOutModal