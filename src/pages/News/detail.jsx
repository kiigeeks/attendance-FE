
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago'
import NewsIcon from '../../assets/icons/News.svg'
import { getDetailNews } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import Sliders from '../../components/Sliders/Sliders';

const DetailNews = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetchNews()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchNews = async () => {
        getDetailNews(params.slug).then((res) => {
            setData(res.payload)
            setIsLoaded(true)
        }).catch((err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000
            });
        })
    }

    return (
        <div>
        {isLoaded 
            ?
            <section className="mt-3 mb-20 px-3 flex flex-col gap-3">
                <div className="bg-white w-full rounded-t-3xl rounded-b-lg flex flex-col cursor-pointer shadow-md mb-5">
                    <div className="bg-gray-300 flex-initial w-full h-52 rounded-t-2xl flex justify-center items-center">
                        {data.thumbnail
                            ?
                                <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.thumbnail}`} alt="news" className="w-full h-full object-cover rounded-t-2xl" />
                            :
                                <img src={NewsIcon} alt="news" className="w-1/4 object-cover rounded-t-2xl" />
                        }
                    </div>
                    <div className="flex flex-1 flex-col gap-2 tracking-wider py-3 px-4 mb-3">
                        <span className="italic text-right font-light text-xxs md:text-xs text-gray-400">
                            <ReactTimeAgo date={Date.parse(data?.createdAt)} locale="id-ID" />
                        </span>
                        <h3 className="text-sm md:text-base font-medium">
                            {data.title}
                        </h3>
                        <div className="mt-3 text-xxs md:text-xs font-thin text-justify flex flex-col gap-3" dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                </div>

                {data.Post_Galleries ?
                    <Sliders datas={data.Post_Galleries} />
                    : ""
                }
                
                {data.Event ?
                    <a
                        href={data.Event.url}
                        target='_blank'
                        rel="noopener noreferrer"
                        className="h-10 flex justify-center items-center text-white text-xs md:text-sm font-semibold uppercase tracking-wider bg-bluePrimary rounded-3xl"
                    >
                        Join Zoom
                    </a>
                    : ""
                }

                <button onClick={() => navigate("/news")}
                    className="h-10 flex justify-center items-center text-white text-xs md:text-sm font-semibold uppercase tracking-wider bg-redPrimary rounded-3xl"
                >
                    Kembali
                </button>
                
            </section>
                :
                    <Spinner />
            }
        </div>
    )
}

export default DetailNews