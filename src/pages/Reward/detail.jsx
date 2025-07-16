
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewsIcon from '../../assets/icons/News.svg'
import { getDetailReward, redeemReward } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import { dateIndo } from '../../utilities/helpers';

const DetailReward = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isReady, setIsReady] = useState(true)

    useEffect(() => {
        fetchReward()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchReward = async () => {
        getDetailReward(params.id).then((res) => {
            setData(res.payload)
            setIsLoaded(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        })
    }

    const handleClaim = async () => {
        setIsReady(false)
        redeemReward(params.id).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });

            // lari ke history reward
            navigate("/my-rewards")
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoaded(true)
        });
    }

    return (
        <div>
        {isLoaded 
            ?
                <section className="mt-3 mb-20 px-3 flex flex-col gap-5">
                    <div className="bg-white w-full rounded-t-3xl rounded-b-lg flex flex-col cursor-pointer shadow-md">
                        <div className="bg-gray-300 flex-initial w-full h-52 rounded-t-2xl flex justify-center items-center">
                            {data.photo
                                ?
                                    <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.photo}`} alt="news" className="w-full h-full object-cover rounded-t-2xl" />
                                :
                                    <img src={NewsIcon} alt="news" className="w-1/4 object-cover rounded-t-2xl" />
                            }
                        </div>
                        <div className="flex flex-1 flex-col gap-2 tracking-wider py-3 mb-3">
                            <h3 className="text-base font-semibold tracking-wider text-center">{data.title}</h3>
                            <div className="mt-5 w-full flex gap-3 px-5 tracking-wider">
                                <div className="w-[55%] flex flex-initial flex-col">
                                    <h5 className="font-medium text-xs md:text-sm">Points</h5>
                                    <h5 className="font-medium text-xs md:text-sm">Berlaku Sampai</h5>
                                </div>
                                <div className="w-[45%] flex flex-initial flex-col">
                                    <span className="font-light text-xxs md:text-sm text-left">{data.point} point</span>
                                    {/* <span className="font-light text-xxs md:text-sm text-left">21 Februari 2024</span> */}
                                    <span className="font-light text-xxs md:text-sm text-left">{dateIndo(data.expired_at)}</span>
                                </div>
                            </div>
                            <hr className="my-1 w-11/12 self-center" />
                            <div className="w-full flex flex-1 flex-col gap-2 tracking-wider py-3 px-5">
                                <h3 className="text-xs md:text-sm font-medium">
                                    Deskripsi
                                </h3>
                                <div className="mt-3 text-xxs md:text-xs font-light text-justify flex flex-col gap-3" dangerouslySetInnerHTML={{ __html: data.description }} />
                            </div>
                            <div className="mt-5 w-full flex flex-col gap-2 tracking-wider py-3 px-8">
                                <button
                                    onClick={handleClaim}
                                    disabled={!isReady}
                                    className={`w-full h-10 ${isReady ? "bg-yellowSecondary" : "bg-gray-300"} rounded-2xl text-white text-sm md:text-base font-bold tracking-wider`}>
                                    CLAIM
                                </button>
                                <button
                                    onClick={() => navigate("/rewards")}
                                    className="w-full h-10 border border-grayPrimary text-grayPrimary rounded-2xl text-xs md:text-sm font-normal tracking-wider">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                :
                    <Spinner />
            }
        </div>
    )
}

export default DetailReward