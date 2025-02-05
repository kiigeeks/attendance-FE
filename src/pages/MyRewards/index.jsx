import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago'
import InfiniteScroll from "react-infinite-scroll-component"
import NewsIcon from '../../assets/icons/News.svg'
import { getLogRewards } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';
import { getStatusRewards } from '../../utilities/helpers';

const MyRewards = () => {
    const userData = useSelector(selectUserData);
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        // Scroll otomatis ke atas saat komponen dimuat
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (userData && userData.nip) {
            fetchLogs();
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID])

    const fetchLogs = async () => {
        setIsLoaded(false)

        if (!userData || !userData.nip) {
            setIsLoaded(true);
            return;
        }

        getLogRewards(lastID, limit, userData.nip).then((res) => {
            const newDatas = res.payload.datas;
            // console.log(res.payload);
            
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
        
        <>
            {/* {isLoaded 
                ?
                    <> */}
                        {(datas.length === 0 && isLoaded) ? (
                            <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                                maaf, tidak ada history rewards
                            </h1>
                        ) : (
                            <InfiniteScroll
                                dataLength={datas.length}
                                next={fetchMore}
                                hasMore={hasMore}
                                loader={<Spinner />} 
                                className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-5 mb-20 py-5"
                            >    
                                {datas.map((data, i) => (
                                    <div key={i} className="bg-white w-full rounded-3xl flex gap-3 p-4 shadow-md">
                                        <div className="bg-gray-300 flex-initial w-14 h-14 rounded-2xl flex justify-center items-center">
                                            {data.Reward.photo
                                                ?
                                                    <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.Reward.photo}`} alt="news" className="w-full h-full object-cover rounded-2xl" />
                                                :
                                                    <img src={NewsIcon} alt="news" className="w-1/2 h-1/2 object-cover rounded-2xl" />
                                            }
                                        </div>
                                        <div className="flex flex-1 flex-col gap-2 tracking-wider py-1">
                                            <h3 className="text-xs md:text-sm font-medium">
                                                {data.Reward.title}
                                            </h3>
                                            <div className="flex justify-between">
                                                <div className={`py-[2px] px-3 flex text-xxs md:text-xs text-white italic tracking-wider font-extralight w-fit rounded-full ${getStatusRewards(data.status)}`}>
                                                    {data.status}
                                                </div>
                                                <span className="mt-auto italic text-right font-thin text-xxs md:text-xs text-gray-400">
                                                    <ReactTimeAgo date={Date.parse(data.updatedAt)} locale="id-ID" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </InfiniteScroll>
                        )}
                    {/* </>
                :
                    <Spinner />
            } */}
        </>
    )
}

export default MyRewards