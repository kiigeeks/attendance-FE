
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago'
import { createRequestEducation, getEducation, joinEducation } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';
import { IoLogoYoutube } from "react-icons/io";
import { SiZoom } from "react-icons/si";
import Comments from '../../components/Comments';

const DetailEducations = () => {
    const userData = useSelector(selectUserData);
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    const [isRequest, setIsRequest] = useState(false)

    useEffect(() => {
        fetchEducation()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchEducation = async () => {
        getEducation(params.slug).then((res) => {
            setData(res.payload)
            setIsLoaded(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        })
    }

    const handleRequest = async () => {
        setIsLoaded(false)
        const reqData = {
            user_id: userData.id,
            education_id: data.id
        }
    
        createRequestEducation(reqData).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            setIsRequest(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        })
    }

    const handleJoin = async () => {
        setIsLoaded(false)
        
        const reqData = {
            user_id: userData.id,
            education_id: data.id,
            certificate: null,
            is_graduate: false
        }
    
        joinEducation(reqData).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            setIsJoined(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        })
    }

    return (
        <div>
        {isLoaded 
            ?
            <section className="mt-3 mb-20 px-3 flex flex-col gap-3">
                <div className="bg-white w-full rounded-t-3xl rounded-b-lg flex flex-col cursor-pointer shadow-md mb-5">
                    <div className="bg-gray-300 flex-initial w-full h-52 rounded-t-2xl flex justify-center items-center">
                        {data.is_restream
                            ?
                                <IoLogoYoutube className="w-full h-full object-cover rounded-2xl text-red-500" />
                            :
                                <SiZoom className="w-full h-full object-cover rounded-2xl text-blue-500" />
                        }
                    </div>
                    <div className="flex flex-1 flex-col gap-2 tracking-wider py-3 px-4 mb-3">
                        <span className="italic text-right font-light text-xxs md:text-xs text-gray-400">
                            <ReactTimeAgo date={Date.parse(data?.publish_date)} locale="id-ID" />
                        </span>
                        <h3 className="text-lg font-medium">
                            {data.title}
                        </h3>
                        <div className="mt-3 text-sm text-justify flex flex-col gap-3" dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                    {isRequest || userData.Education_Requests.some(item => item.education_id === data.id && item.status === "pending")
                        ? <span className='px-3 text-sm italic font-light text-gray-500 my-5'>*Permintaan Anda sedang diproses oleh Admin</span>
                        : ""
                    }
                    {userData.User_Educations.some(item => item.Education.id === data.id) || isJoined || isRequest || userData.Education_Requests.some(item => item.education_id === data.id && item.status === "pending")
                        ? ""
                        :
                            <div className="flex flex-1 flex-col justify-center items-center gap-2 tracking-wider py-3 px-4 mb-3">
                                {data.is_public
                                    ?
                                        <div onClick={handleJoin}
                                            className={`h-10 w-fit px-7 py-2 ${isLoaded ? "flex" : "hidden"} justify-center items-center text-white text-xs md:text-sm font-semibold uppercase tracking-wider bg-bluePrimary rounded-3xl`}
                                        >
                                            Join
                                        </div>
                                    :
                                        <div onClick={handleRequest}
                                            className={`h-10 w-fit px-7 py-2 ${isLoaded ? "flex" : "hidden"} justify-center items-center text-white text-xs md:text-sm font-semibold uppercase tracking-wider bg-greenPrimary rounded-3xl`}
                                        >
                                            Request
                                        </div>
                                }
                                
                            </div>
                        }
                </div>

                {userData.User_Educations.some(item => item.Education.id === data.id) || isJoined
                    ?
                        <>
                            {data.is_restream
                                ?
                                    <div className="bg-white w-full rounded-3xl flex flex-col gap-5 cursor-pointer shadow-md mb-5">
                                        {data.Sub_Educations.map((item) => (
                                            <div key={item.id} className='flex flex-col px-3 py-5 gap-2'>
                                                {item.link
                                                    ? 
                                                        <div className="bg-gray-200 flex-initial h-[300px] rounded-2xl flex justify-center items-center">
                                                            <iframe
                                                                className="w-full h-full object-contain rounded-2xl"
                                                                src={`https://www.youtube.com/embed/${item.link}?si=teoL4Z_AIUaRpvuC`}
                                                                title="YouTube video player"
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                        </div>
                                                    : ""
                                                }
                                                <div className="flex flex-1 flex-col gap-2 tracking-wider py-1">
                                                    <h3 className="text-xs md:text-sm font-medium">
                                                        {item.title}
                                                    </h3>
                                                    <div className="text-xxs md:text-xs text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description }} />               
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                :
                                    <div className="bg-white w-full rounded-3xl flex flex-col gap-5 cursor-pointer shadow-md mb-5">
                                        {data.Schedules.map((item) => (
                                            <div key={item.id} className='flex flex-col px-3 py-5 gap-2'>
                                                <div className="flex flex-1 flex-col gap-2 tracking-wider py-1">
                                                    <h3 className="text-xs md:text-sm font-medium">
                                                        {item.title}
                                                    </h3>
                                                    <div className="text-xxs md:text-xs text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description }} />   
                                                    {item.link && new Date(`${item.publish_date}T${item.publish_time}`).getTime() <= Date.now()
                                                        ?
                                                            <a onClick={() => navigate("/educations")}
                                                                href={item.link}
                                                                target="_blank" rel="noopener noreferrer"
                                                                className="h-fit w-11/12 self-center px-7 mt-3 py-1.5 flex justify-center items-center text-white text-xs md:text-sm font-medium tracking-wider bg-bluePrimary rounded-3xl"
                                                            >
                                                                Join
                                                            </a>        
                                                        : ""
                                                    }    
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                            }
                        </>
                    : ""
                }

                <Comments paramsId={data?.id} apiFetch={'education_comments/scroll?education_id'} apiDelete={'education_comments'} apiCreate={'education_comments'}/>

            </section>
                :
                    <Spinner />
            }
        </div>
    )
}

export default DetailEducations