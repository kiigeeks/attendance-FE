import { useDispatch, useSelector } from 'react-redux';
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { BiUserCheck } from "react-icons/bi";
import { showAttendace, showClockOut, statusAttendance, timeIn, timeOut } from '../../features/attendance/attendanceSlice';
import { navigateTo, timestampToDate, timestampToTime } from '../../utilities/helpers';


const CardAttendance = () => {    
    const statusAttendanceDetail = useSelector(statusAttendance);
    const timeInDetail = useSelector(timeIn);
    const timeOutDetail = useSelector(timeOut);
    
	const dispatch = useDispatch();

    const handleAttendance = (e) => {
        e.stopPropagation();
        dispatch(showAttendace())
    }

    const handleClockOut = (e) => {
        e.stopPropagation();
        dispatch(showClockOut())
    }

    const handleNavigation = () => {
        const type = "attendance"
        navigateTo(`/informations#${type}`);
    };

    return (
        <div onClick={handleNavigation} className="bg-white w-full rounded-3xl flex py-5 px-4 shadow-md">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-initial text-graySecondary text-sm md:text-base font-semibold">
                    Kehadiran
                </div>
                <div className="flex justify-center items-center flex-1 gap-2 w-full">
                    {statusAttendanceDetail
                        ?
                            <>
                            {statusAttendanceDetail === "IN"
                                ?
                                    <div onClick={(e) => handleClockOut(e)} className='rounded-3xl px-5 py-2 border-2 border-redPrimary flex justify-center items-center gap-2 w-fit cursor-pointer'>
                                        <span className='text-redPrimary font-poppins text-sm'>Clock Out</span>
                                        <MdLogout className="w-5 h-5 text-redPrimary"/>
                                    </div>
                                :
                                    <div className='w-full flex flex-col justify-center items-center gap-2'>
                                        <span className='font-poppins text-xs'>{timestampToDate(timeInDetail)}</span>
                                        <div className='flex flex-row gap-2 justify-center items-center'>
                                            <div className='w-7 bg-blue-100 flex items-center justify-center p-1'>
                                                <MdLogin className='w-5 text-bluePrimary' />
                                            </div>
                                            <span className='font-poppins text-xs'>{timestampToTime(timeInDetail)}</span>
                                            <hr className='h-[2px] w-5 bg-grayPrimary rotate-90'/>
                                            <div className='w-7 bg-blue-100 flex items-center justify-center p-1'>
                                                <MdLogout className='w-5 text-bluePrimary rotate-180' />
                                            </div>
                                            <span className='font-poppins text-xs'>{timestampToTime(timeOutDetail)}</span>
                                        </div>
                                    </div>
                            }
                            </>
                        :
                            <div onClick={(e) => handleAttendance(e)} className='rounded-3xl px-5 py-2 border-2 border-bluePrimary flex justify-center items-center gap-2 w-fit cursor-pointer'>
                                <span className='text-bluePrimary font-poppins text-sm'>Clock In</span>
                                <MdLogin className="w-5 h-5 text-bluePrimary"/>
                            </div>
                    }
                    
                    
                    
                </div>
            </div>
            <div className="flex flex-initial justify-center items-center">
                <BiUserCheck className="w-16 h-16 text-grayPrimary"/>
            </div>
        </div>
    )
}

export default CardAttendance