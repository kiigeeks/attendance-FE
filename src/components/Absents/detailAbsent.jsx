import { MdEventBusy } from "react-icons/md";
import { MdOutlineLocalHospital } from "react-icons/md";
import { MdMoreTime } from "react-icons/md";
import { MdOutlineLuggage } from "react-icons/md";
import PropTypes from 'prop-types';
import { dateIndo, getStatusRewards, timeIndo } from "../../utilities/helpers";


const DetailAbsent = ({ setShowDetail, data}) => {    
    return (
        <div className="flex flex-col justify-center items-center h-fit w-full mt-7 gap-5 mb-8 py-5 relative">    
            <div className="flex flex-col justify-center items-center w-full">
                {data.type === "Ijin" && <MdEventBusy className="w-36 h-36 text-bluePrimary"/> }
                {data.type === "Cuti" && <MdEventBusy className="w-36 h-36 text-bluePrimary"/> }
                {data.type === "Sakit" && <MdOutlineLocalHospital className="w-36 h-36 text-bluePrimary"/> }
                {data.type === "OVT" && <MdMoreTime className="w-36 h-36 text-bluePrimary"/> }
                {data.type === "WFA" && <MdOutlineLuggage className="w-36 h-36 text-bluePrimary"/> }

                <h3 className="text-bluePrimary text-2xl font-bold font-poppins tracking-wider capitalize mt-5">
                    { 
                        data.type === "WFA" ? "Tugas Luar Kota" 
                        : data.type === "OVT" ? "Lembur" 
                        : data.type 
                    }
                </h3>
                <div className={`mt-2 py-[2px] px-3 flex text-xxs md:text-xs text-white italic tracking-wider font-extralight w-fit rounded-full capitalize ${getStatusRewards(data.status)}`}>
                    { data.status }
                </div>

                <span className="font-poppins font-medium text-sm text-bluePrimary mt-7">Mulai :</span>
                <div className="font-poppins font-light text-xs flex flex-row justify-center items-center gap-3">
                    {data.start_date && <span>{dateIndo(data.start_date)}</span>}
                    {data.start_time && <span>{dateIndo(data.start_time)}</span>}
                    {data.start_time && <span>{timeIndo(data.start_time)}</span>}
                </div>
                <span className="font-poppins font-medium text-sm text-bluePrimary mt-1">Sampai :</span>
                <div className="font-poppins font-light text-xs flex flex-row justify-center items-center gap-3">
                    {data.end_date && <span>{dateIndo(data.end_date)}</span>}
                    {data.end_time && <span>{dateIndo(data.end_time)}</span>}
                    {data.end_time && <span>{timeIndo(data.end_time)}</span>}
                </div>
                
                <span className="font-poppins font-medium text-sm text-bluePrimary mt-7">Keterangan</span>
                <span className="font-poppins font-light text-xs flex flex-row justify-center items-center text-center gap-3">
                    {data.note}
                </span>

                {data.type === "Sakit"
                    ?
                        <>
                            <span className="font-poppins font-medium text-sm text-bluePrimary mt-7">Dokumen terlampir</span>
                            <div className="bg-gray-300 flex-initial w-11/12 h-auto rounded-xl flex justify-center items-center mt-2">
                                {data.photo
                                    ?
                                        <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.photo}`} alt="dokumen" className="w-full h-full object-contain rounded-xl" />
                                    :
                                        ""
                                }
                            </div>
                        </>
                    : ""
                }
            </div>
            <div className="mt-16 w-full flex justify-center items-center">
                <div onClick={() => setShowDetail(false)} className="border border-bluePrimary rounded-full px-5 py-1 font-poppins font-light text-xs text-bluePrimary cursor-pointer">
                    Kembali
                </div>
            </div>
        </div>
    )
}

DetailAbsent.propTypes = {
    data: PropTypes.object,
    setShowDetail: PropTypes.func
}

export default DetailAbsent