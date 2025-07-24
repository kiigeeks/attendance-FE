import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createComment, deleteComment, getComments } from '../../utilities/sendRequest'
import PropTypes from 'prop-types';
import Spinner from '../Loader/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactTimeAgo from 'react-time-ago';
import UserIcon from '../../assets/icons/User.svg'
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';
import { FaTrash } from "react-icons/fa";

const Comments = ({ paramsId, apiFetch, apiDelete, apiCreate }) => {
    const userData = useSelector(selectUserData);
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 2
    const [hasMore, setHasMore] = useState(true)
    const [fetchAgain, setFetchAgain] = useState(false)
    const [comment, setComment] = useState("")

    useEffect(() => {
        if(paramsId) fetchComments();
        setFetchAgain(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID, paramsId, fetchAgain])

    const handleDeleteComment = async (paramsId) => {
        setIsLoaded(false)
            
        deleteComment(paramsId, apiDelete).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            setComment("")
            setLastID(0)
            setDatas([])
            setFetchAgain(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        })
    }

    const handleComment = async () => {
        setIsLoaded(false)
        const reqData = {
            user_id: userData.id,
            education_id: paramsId,
            comment
        }
            
        createComment(reqData, apiCreate).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            setComment("")
            setLastID(0)
            setDatas([])
            setFetchAgain(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        })
    }

    const fetchComments = async () => {
        setIsLoaded(false)
        getComments(lastID, limit, paramsId, apiFetch).then((res) => {
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
        <div className="bg-white w-full rounded-3xl flex flex-col gap-5 cursor-pointer shadow-md mb-5 py-5">
            <span className='text-center font-medium text-base'>Comments</span>
            <div className='flex flex-col gap-3 p-3 mt-0'>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='bg-gray-100/90 text-xs rounded-xl px-3 py-4' placeholder='Tulis komentarmu disini ..' rows={3} />
                <div
                    onClick={handleComment}
                    className="py-2 w-1/4 self-end flex justify-center items-center text-white text-xs md:text-sm font-normal capitalize tracking-widest bg-greenPrimary rounded-3xl"
                >Send</div>
            </div>
            <hr className='w-11/12 self-center h-[1px] rounded-full border-0 bg-gray-300' />
            <>
                {(datas.length === 0 && isLoaded) ? (
                    <h1 className="mt-5 font-poppins italic font-medium text-sm text-center text-slate-500 capitalize">
                        No Comments Yet
                    </h1>
                ) : (
                    <InfiniteScroll
                        dataLength={datas.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<Spinner />} 
                        className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-10 mb-10 py-5"
                    > 
                        {datas.map((data, i) => (
                            <div key={i} className='flex flex-col px-3 w-full'>
                                <div className="flex-initial h-[50px] rounded-2xl flex flex-row justify-star items-start gap-2">
                                    <div className='h-[30px] w-[30px] bg-gray-200 rounded-full'>
                                        {userData.photo
                                            ?
                                                <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${userData.photo}`} alt="user" className="w-full h-full object-cover rounded-full" />
                                            :
                                                <img src={UserIcon} loading="eager" alt="user" className="w-full h-full object-cover rounded-full" />
                                        }
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-xs font-normal'>{data.user_fullname}</span>
                                        <span className='text-xxs font-light'>{data.office}</span>
                                    </div>
                                </div> 
                                <div className="flex flex-1 flex-col gap-2 tracking-wider">
                                    <p className="text-xs md:text-sm font-light">
                                        {data.comment}
                                    </p>
                                    <div className={`flex flex-row ${data.user_id === userData.id ? "justify-between": "justify-end"}`}>
                                        {data.user_id === userData.id
                                            ? <FaTrash onClick={() => handleDeleteComment(data.id)} className='text-redPrimary/80 hover:text-redPrimary text-sm cursor-pointer' />
                                            : ""
                                        }
                                        
                                        <span className='text-xxs font-light italic text-end'>
                                            <ReactTimeAgo date={Date.parse(data.createdAt)} locale="id-ID" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                )}
            </>
        </div>
    )
}

Comments.propTypes = {
    paramsId: PropTypes.number,
    apiFetch: PropTypes.string,
    apiDelete: PropTypes.string,
    apiCreate: PropTypes.string,
}

export default Comments