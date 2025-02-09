import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getInformations } from '../../utilities/sendRequest';
import Spinner from '../../components/Loader/Spinner';
import { useLocation } from 'react-router-dom';

const Informations = () => {
    const [datas, setDatas] = useState([])
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation();

    useEffect(() => {
        fetchInformations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Memfilter data berdasarkan hash
        const hash = location.hash.replace("#", ""); // Menghapus tanda #
        if (hash) {
            setFilteredDatas(datas.filter((data) => data.type === hash));
        } else {
            setFilteredDatas(datas);
        }
    }, [location.hash, datas]);

    const fetchInformations = async () => {
        setIsLoaded(false)
        getInformations().then((res) => {
            setDatas(res.payload.sort((a, b) => {
                if (a.type === 'company' && b.type !== 'company') {
                    return -1;
                }
                if (a.type !== 'company' && b.type === 'company') {
                    return 1;
                }
                return 0;
            }))
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
                    <div className="bg-white w-full rounded-xl flex flex-col gap-5 cursor-pointer shadow-md mb-5">
                        {filteredDatas.map((data) => (
                            <div className="flex flex-1 flex-col gap-2 tracking-wider py-3 px-4 mb-3" key={data.id} id={data.type}>
                                <h3 className="text-sm md:text-base font-medium">
                                    {data.title}
                                </h3>
                                <div className="mt-3 text-xxs md:text-xs font-normal text-justify flex flex-col gap-3" dangerouslySetInnerHTML={{ __html: data.description }} />
                                <hr className='h-[2px] bg-grayPrimary/50 w-full rounded-full my-3' />
                               
                            </div>
                        ))}
                    </div>
                </section>
                    :
                        <Spinner />
            }
        </div>
    )
}

export default Informations