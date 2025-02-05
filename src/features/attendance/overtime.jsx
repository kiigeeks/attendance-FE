import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { fetchOvertime, hiddenOvertime, statusOvertime } from './attendanceSlice'
import { createTimeStamp, navigateTo } from '../../utilities/helpers';
import { createOvertime } from '../../utilities/sendRequest';
import Modal from '../../components/Modal'


const OvertimeModal = () => {
    const clickRef = useRef(null)
	const dispatch = useDispatch();
    const statusTitle = useSelector(statusOvertime);
    const [isReady, setIsReady] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                dispatch(hiddenOvertime())
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickRef])

    useEffect(() => {
        const isReady = (startDate !== "" && startTime !== "" && endDate !== "" && endTime !== "" && note !== "");
        setIsReady(isReady);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, startTime, endDate, endTime, note])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsReady(false)

        const start_time = createTimeStamp(startDate, startTime)
        const end_time = createTimeStamp(endDate, endTime)
        const type = statusTitle === "Lembur" ? "OVT" : "WFA"

        const reqData = {
            note,
            type,
            start_time,
            end_time
        }

        createOvertime(reqData).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });
            handleReset()
            dispatch(hiddenOvertime())
            dispatch(fetchOvertime(true))
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsReady(true)
        })
    }

    const handleReset = () => {
        setStartDate("")
        setStartTime("")
        setEndDate("")
        setEndTime("")
        setNote("")
    }

    const handleNavigation = () => {
        const type = "overtime";
        dispatch(hiddenOvertime())
        navigateTo(`/informations#${type}`);
    };

    return (
        <Modal>
            <div ref={clickRef} className='fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col gap-10 justify-center items-center'>
                <div className="flex flex-col gap-2 rounded-t-2xl w-[95vw] md:w-[500px] px-3 md:px-7 py-5 md:py-7 bg-white">
                    <div className='flex justify-center items-center relative'>
                        <h3 className='flex justify-center items-center font-poppins font-semibold text-base md:text-lg'>
                            {statusTitle}
                        </h3>
                        <BsFillInfoCircleFill onClick={handleNavigation} className='absolute top-0 right-0 h-6 w-6 rounded-full text-grayPrimary cursor-pointer' />
                    </div>
                    <hr className='h-[2px] bg-grayPrimary/50 w-full rounded-full my-3' />
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-2 w-full font-poppins text-sm">
                        <div className="mb-6">
                            <h3 className="text-blue-500 font-semibold mb-1 md:mb-2 text-sm md:text-base">Mulai</h3>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="startDate" className="block text-xs md:text-sm font-medium text-gray-700">Tanggal</label>
                                    <input type="date" id="startDate" name='startDate'
                                        onChange={(e) =>setStartDate(e.target.value)}
                                        required
                                        className="mt-1 block w-full border-2 rounded-lg p-2 text-xs md:text-sm"
                                        value={startDate} />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="startTime" className="block text-xs md:text-sm font-medium text-gray-700">Jam</label>
                                    <input type="time" id="startTime" name='startTime'
                                        onChange={(e) =>setStartTime(e.target.value)}
                                        required
                                        className="mt-1 block w-full border-2 rounded-lg p-2 text-xs md:text-sm"
                                        value={startTime} />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-blue-500 font-semibold mb-1 md:mb-2 text-sm md:text-base">Sampai</h3>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="endDate" className="block text-xs md:text-sm font-medium text-gray-700">Tanggal</label>
                                    <input type="date" id="endDate" name='endDate'
                                        onChange={(e) =>setEndDate(e.target.value)}
                                        required
                                        className="mt-1 block w-full border-2 rounded-lg p-2 text-xs md:text-sm"
                                        value={endDate} />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="endTime" className="block text-xs md:text-sm font-medium text-gray-700">Jam</label>
                                    <input type="time" id="endTime" name='endTime'
                                        onChange={(e) =>setEndTime(e.target.value)}
                                        required
                                        className="mt-1 block w-full border-2 rounded-lg p-2 text-xs md:text-sm" 
                                        value={endTime}/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <label htmlFor="note" className="block text-xs md:text-sm font-medium text-gray-700">Keterangan</label>
                            <textarea id="note" name='note' rows="3"
                                value={note}
                                onChange={(e) =>setNote(e.target.value)}
                                className="mt-1 block w-full border-2 rounded-lg p-2 text-xs md:text-sm">
                            </textarea>
                        </div>

                        <button type='submit' 
                            disabled={!isReady}
                            className={`flex flex-row justify-center items-center gap-2 w-full font-poppins text-xs md:text-sm rounded-full py-2 md:py-3 ${isReady ? 'text-white bg-bluePrimary cursor-pointer' : 'text-gray-800 bg-gray-300 cursor-wait'}`} >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default OvertimeModal
