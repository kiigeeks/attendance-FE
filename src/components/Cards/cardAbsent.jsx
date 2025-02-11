import { Link } from 'react-router-dom';
import { IoDocumentTextOutline } from "react-icons/io5";

const CardAbsent = () => {
    return (
        <Link to={"/absents"} className="bg-white w-full rounded-3xl flex py-5 px-4 shadow-md">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-initial text-graySecondary text-sm md:text-base font-semibold">
                    Pengajuan
                </div>
                <div className="flex justify-start items-center flex-1 flex-wrap gap-2 w-full font-poppins text-xs md:text-sm px-3">
                    <div className='rounded-xl px-3 py-1 border-[2px] border-grayPrimary'>
                        Izin
                    </div>
                    <div className='rounded-xl px-3 py-1 border-[2px] border-grayPrimary'>
                        Sakit
                    </div>
                    <div className='rounded-xl px-3 py-1 border-[2px] border-grayPrimary'>
                        Lembur
                    </div>
                    <div className='rounded-xl px-3 py-1 border-[2px] border-grayPrimary'>
                        Luar Kota
                    </div>
                    {/* <div className='rounded-xl px-3 py-1 border-[2px] border-grayPrimary'>
                        Cuti
                    </div> */}
                </div>
            </div>
            <div className="flex flex-initial justify-center items-center">
                <IoDocumentTextOutline className="w-16 h-16 text-grayPrimary"/>
            </div>
        </Link>
    )
}

export default CardAbsent