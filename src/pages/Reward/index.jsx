import NewsIcon from '../../assets/icons/News.svg'
import FowardIcon from '../../assets/icons/Forward.svg'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from 'react-router-dom';
import { getRewards } from '../../utilities/sendRequest'
import Spinner from '../../components/Loader/Spinner';

const Reward = () => {
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5
    const keyword = ""
    const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
        fetchRewards();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID, keyword])

    const fetchRewards = async () => {
        setIsLoaded(false)
        getRewards(keyword, lastID, limit).then((res) => {
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
			{/* card reward */}
			{isLoaded 
                ?
                    <>
                        {datas.length === 0 ? (
                            <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                                maaf, Reward tidak ditemukan
                            </h1>
                        ) : (
                            <InfiniteScroll
                                dataLength={datas.length}
                                next={fetchMore}
                                hasMore={hasMore}
                                loader={<Spinner />} 
                                className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-5 mb-5 py-5"
                            >    
                                {datas.map((data, i) => (
                                    <Link to={`/rewards/${data.id}`} key={i} className="bg-white w-full rounded-3xl flex gap-3 p-4 cursor-pointer shadow-md">
                                        <div className="bg-gray-300 flex-initial w-28 h-28 rounded-2xl flex justify-center items-center">
                                            {data.photo
                                                ?
                                                    <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.photo}`} alt="news" className="w-full h-full object-cover rounded-2xl" />
                                                :
                                                    <img src={NewsIcon} alt="news" className="w-1/2 h-1/2 object-cover rounded-2xl" />
                                            }
                                        </div>
                                        <div className="flex flex-1 flex-col gap-1 tracking-wider py-2">
											<h3 className="text-xs md:text-sm font-semibold">
												{data.title}
											</h3>
											<p className="text-xxs md:text-xs text-gray-400">
												{data.point} point
											</p>
										</div>
										<div className="flex flex-initial w-5 items-center">
											<img src={FowardIcon} className="w-5 h-auto" alt="Foward" loading="eager" />
										</div>
                                    </Link>
                                ))}
                            </InfiniteScroll>
                        )}
                    </>
                :
                    <Spinner />
            }
		</>
	)
}

export default Reward