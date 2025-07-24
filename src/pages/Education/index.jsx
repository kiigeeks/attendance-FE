import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago'
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from 'react-router-dom';
import { getEducations } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import { IoLogoYoutube } from "react-icons/io";
import { SiZoom } from "react-icons/si";


const Educations = () => {
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchEducations();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID, keyword])

    const fetchEducations = async () => {
        setIsLoaded(false)
        getEducations(lastID, limit, keyword).then((res) => {
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

    const handleSearch = (e) => {
        e.preventDefault();

        setLastID(0)
        setDatas([])
        setKeyword(query)
    }

    return (
        <>
            <form onSubmit={handleSearch} className="bg-white w-full h-11 rounded-3xl flex px-5 py-2 cursor-pointer shadow-md">
                <input type="text" placeholder='Search ...' value={query} onChange={(e) => setQuery(e.target.value)} className="w-full focus:outline-none focus:ring-0" />
                <input type="submit" hidden />
            </form>
            {/* {isLoaded 
                ? */}
                    <>
                        {(datas.length === 0 && isLoaded) ? (
                            <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                                maaf, berita tidak ditemukan
                            </h1>
                        ) : (
                            <InfiniteScroll
                                dataLength={datas.length}
                                next={fetchMore}
                                hasMore={hasMore}
                                loader={<Spinner />} 
                                className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-5 mb-10 py-5"
                            >    
                                {datas.map((data, i) => (
                                    <Link to={`/educations/${data.slug}`} key={i} className="bg-white w-full rounded-3xl flex gap-3 p-4 cursor-pointer shadow-md">
                                        <div className="bg-gray-200 flex-initial w-28 h-28 rounded-2xl px-5 flex justify-center items-center">
                                            {data.is_restream
                                                ?
                                                    <IoLogoYoutube className="w-full h-full object-cover rounded-2xl text-red-500" />
                                                :
                                                    <SiZoom className="w-full h-full object-cover rounded-2xl text-blue-500" />
                                            }
                                        </div>
                                        <div className="flex flex-1 flex-col gap-2 tracking-wider py-1">
                                            <h3 className="text-xs md:text-sm font-medium">
                                                {data.title}
                                            </h3>
                                            <div className="text-xxs md:text-xs text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: data.description }} />
                                            <span className="mt-auto italic text-right font-light text-xxs md:text-xs text-gray-400">
                                                <ReactTimeAgo date={Date.parse(data.publish_date)} locale="id-ID" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </InfiniteScroll>
                        )}
                    </>
                {/* :
                    <Spinner />
            } */}
        </>
    )
}

export default Educations