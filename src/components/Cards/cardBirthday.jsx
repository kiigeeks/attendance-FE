import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AvatarIcon from '../../assets/icons/Male-User.svg'
import { getBirhdays } from '../../utilities/sendRequest';
import { convertBirthdayFormat } from '../../utilities/helpers';
import Spinner from '../Loader/Spinner';

const CardBirthday = () => {
    const [todays, setTodays] = useState([])
    const [upcomings, setUpcomings] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetchBirthdays();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchBirthdays = async () => {
        setIsLoaded(false)
        getBirhdays().then((res) => {
            const todayDate = new Date().toISOString().split('T')[0];

            // Memisahkan data menjadi today birthday dan upcoming
            const todayBirthday = [];
            const upcomingBirthday = [];

            res.payload.forEach(person => {
                const birthday = person.Biodata.birthday;
                if (birthday.substring(5) === todayDate.substring(5)) {
                    todayBirthday.push(person);
                } else {
                    upcomingBirthday.push(person);
                }
            });

            setUpcomings(upcomingBirthday)
            setTodays(todayBirthday)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        })
    }

    if (upcomings.length === 0 || todays.length === 0) {
        return null; // Tidak menampilkan apa pun
    }

    return (
        <div className="bg-white w-full rounded-3xl flex flex-col gap-3 py-5 px-4 shadow-md">
            {isLoaded 
                ? 
                    <>
                        {todays.length !== 0 ? (
                            <>
                                <div className="flex flex-col gap-3 flex-1">
                                    <div className="flex flex-initial text-graySecondary text-sm md:text-base font-semibold">
                                        Today s Birthdays
                                    </div>
                                    <div className="flex flex-col flex-1 gap-3">
                                        {/* user */}
                                        {todays.map((data) => (
                                            <div className="flex w-full px-3 py-2 gap-5" key={data.nip}>
                                                <div className="flex justify-center items-center">
                                                    <div className="bg-white border-2 border-white w-12 md:w-14 h-12 md:h-14 rounded-full shadow-md">
                                                        {data.photo
                                                            ?
                                                                <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.photo}`} loading="eager" alt="pictures" className="w-full h-full object-cover rounded-full object-top" />
                                                            :
                                                                <img src={AvatarIcon} loading="eager" alt="pictures" className="w-full h-full object-cover rounded-full object-top" />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex flex-col tracking-wider">
                                                    <h4 className="text-xs md:text-sm font-medium">{data.fullname}</h4>
                                                    <h5 className="text-xxs md:text-xs font-light text-gray-500">{data.Biodata.Office.name}</h5>
                                                    <span className="text-xxs md:text-xs font-thin italic">{convertBirthdayFormat(data.Biodata.birthday)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="my-3 w-1/2 h-[2px] self-center bg-gray-400 rounded-3xl"></div>
                            </>
                        ) : "" }
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="flex flex-initial text-yellowSecondary text-sm md:text-base font-semibold">
                                Upcoming Birthdays
                            </div>
                            <div className="flex flex-col flex-1 gap-3">
                                {/* user --> */}
                                {upcomings.map((data) => (
                                    <div className="flex w-full px-3 py-2 gap-5" key={data.nip}>
                                        <div className="flex justify-center items-center">
                                            <div className="bg-white border-2 border-white w-12 md:w-14 h-12 md:h-14 rounded-full shadow-md">
                                                {data.photo
                                                    ?
                                                        <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.photo}`} loading="eager" alt="pictures" className="w-full h-full object-cover rounded-full object-top" />
                                                    :
                                                        <img src={AvatarIcon} loading="eager" alt="pictures" className="w-full h-full object-cover rounded-full object-top" />
                                                }
                                            </div>
                                        </div>
                                        <div className="flex flex-col tracking-wider">
                                            <h4 className="text-xs md:text-sm font-medium">{data.fullname}</h4>
                                            <h5 className="text-xxs md:text-xs font-light text-gray-500">{data.Biodata.Office.name}</h5>
                                            <span className="text-xxs md:text-xs font-thin italic">{convertBirthdayFormat(data.Biodata.birthday)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                :
                    <div className='mb-10'>
                        <Spinner />
                    </div>
            }
        </div>
    )
}

export default CardBirthday