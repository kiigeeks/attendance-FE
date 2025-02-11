import { MdOutlineLuggage } from "react-icons/md";
import { MdMoreTime } from "react-icons/md";
import { MdEventBusy } from "react-icons/md";
import { MdOutlineLocalHospital } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const Absents = () => {
    return (
        <div className="flex flex-col justify-center items-center h-fit w-full mt-2 gap-5 mb-20 py-5 relative">    
            {/* <Link to={"/annuals"} className="bg-white w-full rounded-3xl flex gap-3 p-4 shadow-md relative cursor-pointer">
                <div className='h-full w-4 rounded-s-3xl bg-bluePrimary absolute left-0 top-0'></div>
                <div className="flex flex-col gap-2 flex-1 ml-5 font-poppins text-sm md:text-base font-medium md:font-semibold justify-center tracking-wider">
                    Cuti
                </div>
                <div className="flex flex-initial justify-center items-center">
                    <MdEventBusy className="w-10 md:w-14 h-10 md:h-14 text-grayPrimary"/>
                </div>
            </Link> */}
            <Link to={"/permissions"} className="bg-white w-full rounded-3xl flex gap-3 p-4 shadow-md relative cursor-pointer">
                <div className='h-full w-4 rounded-s-3xl bg-bluePrimary absolute left-0 top-0'></div>
                <div className="flex flex-col gap-2 flex-1 ml-5 font-poppins text-sm md:text-base font-medium md:font-semibold justify-center tracking-wider">
                    Ijin
                </div>
                <div className="flex flex-initial justify-center items-center">
                    <MdEventBusy className="w-10 md:w-14 h-10 md:h-14 text-grayPrimary"/>
                </div>
            </Link>
            <Link to={"/sicks"} className="bg-white w-full rounded-3xl flex gap-3 p-4 shadow-md relative cursor-pointer">
                <div className='h-full w-4 rounded-s-3xl bg-bluePrimary absolute left-0 top-0'></div>
                <div className="flex flex-col gap-2 flex-1 ml-5 font-poppins text-sm md:text-base font-medium md:font-semibold justify-center tracking-wider">
                    Sakit
                </div>
                <div className="flex flex-initial justify-center items-center">
                    <MdOutlineLocalHospital className="w-10 md:w-14 h-10 md:h-14 text-grayPrimary"/>
                </div>
            </Link>
            {/* <Link to={"/overtimes"} className="bg-white w-full rounded-3xl flex gap-3 p-4 shadow-md relative cursor-pointer">
                <div className='h-full w-4 rounded-s-3xl bg-bluePrimary absolute left-0 top-0'></div>
                <div className="flex flex-col gap-2 flex-1 ml-5 font-poppins text-sm md:text-base font-medium md:font-semibold justify-center tracking-wider">
                    Lembur
                </div>
                <div className="flex flex-initial justify-center items-center">
                    <MdMoreTime className="w-10 md:w-14 h-10 md:h-14 text-grayPrimary"/>
                </div>
            </Link> */}
            <Link to={"/trips"} className="bg-white w-full rounded-3xl flex gap-3 p-4 shadow-md relative cursor-pointer">
                <div className='h-full w-4 rounded-s-3xl bg-bluePrimary absolute left-0 top-0'></div>
                <div className="flex flex-col gap-2 flex-1 ml-3 font-poppins text-sm md:text-base font-medium md:font-semibold justify-center tracking-wider">
                    Tugas Luar Kantor
                </div>
                <div className="flex flex-initial justify-center items-center">
                    <MdOutlineLuggage className="w-10 md:w-14 h-10 md:h-14 text-grayPrimary"/>
                </div>
            </Link>
            <div className="fixed -z-20 bottom-24 md:bottom-16">
                <IoDocumentTextOutline className="w-36 md:w-52 h-36 md:h-52 text-grayPrimary/20"/>
            </div>
            
        </div>
    )
}

export default Absents