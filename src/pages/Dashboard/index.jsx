import CardProfile from '../../components/Cards/cardProfile'
// import CardFee from '../../components/Cards/cardFee'
import CardGift from '../../components/Cards/cardGift'
// import { toast } from 'react-toastify';
import CardBirthday from '../../components/Cards/cardBirthday'
import CardPoint from '../../components/Cards/cardPoint'
import CardAttendance from '../../components/Cards/cardAttendance'
import CardAbsent from '../../components/Cards/cardAbsent'
// import { useSelector } from 'react-redux'
// import { selectUserData } from '../../features/user/userSlice'
import { useEffect } from 'react'
// import { calculateDistance, checkHireDate } from '../../utilities/helpers'
// import CardAnnual from '../../components/Cards/cardAnnual'

const Dashboard = () => {
    // const userData = useSelector(selectUserData);
	// console.log(userData);
	
    // const [isWithinTime, setIsWithinTime] = useState(false);
    // const [isWithinRadius, setIsWithinRadius] = useState(false);
    // const radius = 500; // meter
	// const isMoreThanOneYear = checkHireDate(userData?.Biodata?.hire_date, userData?.is_permanent);
	
	useEffect(() => {
        // Ambil jam saat ini
        // const now = new Date();
        // const currentHour = now.getHours();
        // const withinTime = currentHour >= 7 && currentHour < 24;
        // setIsWithinTime(withinTime);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	// useEffect(() => {
    //     const addresses = userData?.Biodata?.Office?.Office_Addresses || [];
    //     const mainAddress = addresses.find((address) => address.Address.is_main); // Alamat utama
    //     const otherAddresses = addresses.filter((address) => !address.Address.is_main); // Alamat lainnya

    //     if (mainAddress) {
    //         checkDistance(mainAddress.Address.meta, otherAddresses);
    //     } else if (otherAddresses.length > 0) {
    //         // Jika tidak ada alamat utama, gunakan alamat lainnya
    //         const firstOtherAddress = otherAddresses.shift();
    //         checkDistance(firstOtherAddress.Address.meta, otherAddresses);
    //     } else {
    //         console.log("No addresses available.");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userData]);

	// const checkDistance = (metaData, otherAddresses) => {
    //     if (metaData && metaData.includes(", ")) {
    //         const [metaLat, metaLon] = metaData.split(", ").map(Number);
    //         if (!isNaN(metaLat) && !isNaN(metaLon)) {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     const userLat = position.coords.latitude;
    //                     const userLon = position.coords.longitude;

    //                     // Menghitung jarak
    //                     const distance = calculateDistance(userLat, userLon, metaLat, metaLon);

    //                     // console.log("Meta Lat:", metaLat, "Meta Lon:", metaLon);
    //                     // console.log("User Lat:", userLat, "User Lon:", userLon);
    //                     // console.log("Distance:", distance);

    //                     if (distance <= radius) {
    //                         setIsWithinRadius(true);
    //                         console.log("Within radius of:", metaData);
    //                     } else {
    //                         console.log("Outside radius of:", metaData);

    //                         // Jika jarak masih di luar radius, cek alamat lainnya
    //                         if (otherAddresses.length > 0) {
    //                             const nextAddress = otherAddresses.shift(); // Ambil alamat berikutnya
    //                             checkDistance(nextAddress.Address.meta, otherAddresses);
    //                         } else {
    //                             setIsWithinRadius(false);
    //                             console.log("No addresses within radius.");
    //                         }
    //                     }
    //                 },
    //                 (error) => {
    //                     switch (error.code) {
    //                         case error.PERMISSION_DENIED:
    //                             toast.error("User denied the request for Geolocation.");
    //                             break;
    //                         case error.POSITION_UNAVAILABLE:
    //                             toast.error("Location information is unavailable.");
    //                             break;
    //                         case error.TIMEOUT:
    //                             toast.error("The request to get user location timed out.");
    //                             break;
    //                         default:
    //                             toast.error("An unknown error occurred.");
    //                     }
    //                 }
    //             );
    //         } else {
    //             console.log("Invalid metaData format.");
    //         }
    //     }
    // };
	
    return (
        <>
			{/* card */}
			<CardProfile />

			<CardAttendance />
			{/* Attendance */}
			{/* {userData.isWFA || (userData.Attendances?.[0]?.clock_in && !userData.Attendances?.[0]?.clock_out)
				?
					<CardAttendance />
				:
					<>
						{isWithinTime && isWithinRadius
							? <CardAttendance />
							: ""
						}
					</>
			} */}

			{/* point */}
			<CardPoint />

			{/* Gift */}
			<CardGift />

			{/* cuti */}
			{/* {isMoreThanOneYear
				? <CardAnnual />
				: ""
			} */}
			

			{/* Birthday */}
			<CardBirthday />

			{/* Absent */}
			<CardAbsent />
		</>
    )
}

export default Dashboard