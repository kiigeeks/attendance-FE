import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { BiUserCheck } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getAttendances } from "../../utilities/sendRequest";
import { selectUserData } from "../../features/user/userSlice";
import Spinner from "../../components/Loader/Spinner";
import { dateIndo } from "../../utilities/helpers";
import InfiniteScroll from "react-infinite-scroll-component"


const Attendances = () => {
    const userData = useSelector(selectUserData);
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5
    const [hasMore, setHasMore] = useState(true)
    
    useEffect(() => {
        // Setelah reset selesai, baru fetch data
        if(userData && userData.nip !== undefined) {
            fetchDatas();
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID]);

    const fetchDatas = async () => {
        setIsLoaded(false)
        getAttendances(lastID, limit, userData.nip).then((res) => {
            const newDatas = res.payload.datas;
            
            setDatas([...datas, ...newDatas])
            setTempID(res.payload.lastID)
            setHasMore(res.payload.hasMore)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        })
    }

    const fetchMore = async () => {
        setLastID(tempID)
    }

    return (
        <div className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-5 mb-20 py-5 relative"> 
            <div className="w-full">
                {(datas.length === 0 && isLoaded) ? (
                    <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                        maaf, history kehadiran tidak ditemukan
                    </h1>
                ) : (
                    <InfiniteScroll
                        dataLength={datas.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<Spinner />} 
                        className="flex flex-col justify-center items-center h-fit w-full gap-3 mb-10 py-2"
                    >    
                        {datas.map((data, i) => (
                            <div key={i} className="bg-white w-full rounded-3xl flex flex-row justify-between items-center gap-3 p-4 shadow-md cursor-pointer">
                                <h3 className="font-poppins text-xs">{dateIndo(data.date)}</h3>
                                <div className='flex flex-row gap-1 justify-center items-center'>
                                    <div className='w-5 bg-blue-100 flex items-center justify-center px-1 py-[2px] rounded-md'>
                                        <MdLogin className='w-3 text-bluePrimary' />
                                    </div>
                                    <span className='font-poppins text-xxs'>{data.clock_in}</span>
                                </div>
                                <div className='flex flex-row gap-1 justify-center items-center'>
                                    <div className='w-5 bg-blue-100 flex items-center justify-center px-1 py-[2px] rounded-md'>
                                        <MdLogout className='w-3 text-bluePrimary rotate-180' />
                                    </div>
                                    <span className='font-poppins text-xxs'>{data.clock_out}</span>
                                </div>
                                <h3 className="font-poppins font-semibold text-xs">{data.status}</h3>
                            </div>
                        ))}
                    </InfiniteScroll>
                )}
            </div>

            <div className="fixed -z-20 bottom-16">
                <BiUserCheck className="w-52 h-52 text-grayPrimary/20"/>
            </div>
            
        </div>
    )
}

export default Attendances