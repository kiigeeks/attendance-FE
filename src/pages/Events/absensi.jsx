import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { absensiEvent, getDetailNews } from '../../utilities/sendRequest';
import { useNavigate, useParams } from 'react-router-dom';
import NewsIcon from '../../assets/icons/News.svg'
import Spinner from '../../components/Loader/Spinner';

const AbsensiEvent = () => {
    const [isReady, setIsReady] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [nip, setNip] = useState("")
    const currentDate = new Date();

    useEffect(() => {
        fetchNews()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const isReady = (nip !== "");
        setIsReady(isReady);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nip])
    
    const fetchNews = async () => {
        getDetailNews(params.slug).then((res) => {
            setData(res.payload)

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1); 

            const expiredDate = res.payload.Event?.published_at
                                    ? new Date(res.payload.Event.published_at)
                                    : yesterday;
            if (expiredDate < currentDate) {
                navigate("/error-not-found")
            }

        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
            navigate("/error-not-found")
        }).finally(() => {
            setIsLoaded(true)
        });
    }

    const handleAbsensi = async (e) => {
        e.preventDefault();
        setIsReady(false)

        const reqData = {
            nip
        }

        absensiEvent(params.slug, reqData).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            setIsReady(true)
            navigate("/event/success")
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000
            });
        })
    }
    
    return (
        <>
            {isLoaded
                ?
                    (<section className='flex justify-center items-center flex-col py-10 w-screen'>
                        <h1 className='font-bold text-3xl tracking-wider text-center'>Absensi Event Binar</h1>
                        <div className='flex flex-col justify-center items-center gap-5 mt-10'>
                            <div className="bg-gray-300 flex-initial w-11/12 md:w-72 max-w-11/12 rounded-md flex justify-center items-center">
                                {data.thumbnail
                                    ?
                                        <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.thumbnail}`} alt="news" className="w-full h-full object-cover rounded-md" />
                                    :
                                        <img src={NewsIcon} alt="news" className="w-1/4 object-cover rounded-t-2xl" />
                                }
                            </div>
                            <h3 className='text-sm'>{data.title}</h3>
                        </div>
            
                        <div className="bg-white w-11/12 md:w-1/2 lg:w-1/4 rounded-3xl flex flex-col items-center gap-5 py-4 px-6 mt-10 shadow-md">
                            <form onSubmit={handleAbsensi} className="mt-2 flex flex-col gap-5 tracking-wider w-full">
                                <input autoComplete="username" className='hidden' type='text' name='username' id='username' />
                                <div className="flex flex-col gap-1">
                                    <label htmlFor='nip'className="text-xs md:text-sm font-light italic px-3">Nomor Induk Pegawai</label>
                                    <div className="h-10 border border-graySecondary rounded-3xl w-full flex flex-row justify-between items-center ">
                                        <input
                                            id='nip' name='nip'
                                            placeholder='Your NIP'
                                            minLength={3}
                                            onChange={(e) => setNip(e.target.value)}
                                            type="text"
                                            className="h-full w-full text-xs md:text-sm bg-white rounded-3xl px-3 focus:outline-none focus:ring-0" />
                                    </div>
                                </div>
                                <div className="mt-5 w-full flex flex-col gap-4 tracking-wider py-3">
                                    <button type="submit"
                                        disabled={!isReady}
                                        className={`w-full h-10 uppercase rounded-3xl text-sm font-semibold tracking-widest ${isReady ? 'text-white bg-yellowSecondary cursor-pointer' : 'text-gray-800 bg-gray-300 cursor-wait'}`}>
                                        Claim
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>)
                :
                    (<section className='w-screen h-screen flex justify-center items-center'>
                        <Spinner />
                    </section>)
            }
        </>
    )
}

export default AbsensiEvent