import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago'
import InfiniteScroll from "react-infinite-scroll-component"
import { getLogPoints } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';

const Points = () => {
    const userData = useSelector(selectUserData);
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5
    const [hasMore, setHasMore] = useState(true)

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

        getLogPoints(lastID, limit, userData.nip).then((res) => {
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
        
        <>
            {/* {isLoaded 
                ?
                    <> */}
                        {(datas.length === 0 && isLoaded) ? (
                            <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                                maaf, tidak ada history point
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
                                        <div className={`flex-initial w-14 h-14 px-1 rounded-2xl flex justify-center items-center bg-gradient-to-tr ${data.type === 'revenue' ? 'from-yellowSecondary to-yellowPrimary' : 'from-graySecondary to-grayPrimary'}`}>
                                            <h2 className="text-white text-xs font-bold tracking-wider">{data.type === 'revenue' ? '+'+data.point : '-'+data.point}</h2>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center gap-2 tracking-wider py-1 mt-2">
                                            <div className="text-xs md:text-sm justify-self-center font-medium" dangerouslySetInnerHTML={{ __html: data.description }} />
                                                <span className="mt-auto italic text-right font-thin text-xxs md:text-xs text-gray-400">
                                                    <ReactTimeAgo date={Date.parse(data.createdAt)} locale="id-ID" />
                                                </span>
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

export default Points