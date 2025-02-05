import { MdEventBusy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../../components/Loader/Spinner";
import { getAbsents } from "../../utilities/sendRequest";
import { dateIndo, getStatusRewards } from "../../utilities/helpers";
import { fetchAbsent, isFetchAbsent, showAbsent } from "../../features/attendance/attendanceSlice";
import DetailAbsent from "../../components/Absents/detailAbsent";


const Annuals = () => {
	const dispatch = useDispatch();
    const isFecthAbsentSelector = useSelector(isFetchAbsent);
    const [datas, setDatas] = useState([])
    const [data, setData] = useState({})
    const [showDetail, setShowDetail] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5
    const [hasMore, setHasMore] = useState(true)
    const [isDataCleared, setIsDataCleared] = useState(false);

    useEffect(() => {
        if (isFecthAbsentSelector) {
            // Reset state secara terpisah
            setDatas([]);
            setLastID(0);
            setTempID(0);
            setIsDataCleared(false); 
            dispatch(fetchAbsent(false));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFecthAbsentSelector]);

    useEffect(() => {
        // Hanya fetch data jika datas sudah benar-benar kosong
        if (datas.length === 0 && !isDataCleared) {
            setIsDataCleared(true); // Tandai bahwa data sudah kosong
            fetchDatas(); // Panggil fetchDatas setelah data benar-benar kosong
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datas]);
    
    useEffect(() => {
        // Setelah reset selesai, baru fetch data
        fetchDatas();
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID]);

    const fetchDatas = async () => {
        setIsLoaded(false)
        getAbsents(lastID, limit, "Cuti").then((res) => {
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

    const handleDetail = (tempData) => {
        setShowDetail(true)
        setData(tempData)
    }

    return (
        <>
            {showDetail 
                ? 
                    <DetailAbsent setShowDetail={setShowDetail} data={data} />
                :
                    <div className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-5 mb-20 py-5 relative">
                        <div className="w-full">
                            {(datas.length === 0 && isLoaded) ? (
                                <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                                    maaf, history cuti tidak ditemukan
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
                                        <div key={i} onClick={() => handleDetail(data)} className="bg-white w-full rounded-3xl flex flex-row justify-between items-center gap-3 p-4 shadow-md cursor-pointer">
                                            <h3 className="font-poppins text-xs">{dateIndo(data.start_date)} - {dateIndo(data.end_date)}</h3>
                                            <div className={`py-[2px] px-3 flex text-xxs md:text-xs text-white italic tracking-wider font-extralight w-fit rounded-full capitalize ${getStatusRewards(data.status)}`}>
                                                {data.status}
                                            </div>
                                        </div>
                                    ))}
                                </InfiniteScroll>
                            )}
                        </div>

                        <div onClick={() => dispatch(showAbsent("Cuti"))} className="fixed z-10 bottom-20 w-11/12 md:w-[400px] flex justify-center items-center font-poppins text-sm text-center bg-bluePrimary text-white rounded-full py-3 cursor-pointer">
                            Ajukan Cuti
                        </div>

                        <div className="fixed -z-20 bottom-24 md:bottom-16">
                            <MdEventBusy className="w-36 md:w-52 h-36 md:h-52 text-grayPrimary/20"/>
                        </div>
                    </div>
            }
        </>
    )
}

export default Annuals