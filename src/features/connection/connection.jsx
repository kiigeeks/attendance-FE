import { useEffect, useRef } from 'react'
import { useDispatch } from "react-redux"
import Modal from '../../components/Modal'
import { hiddenOffline } from './connectionSlice'
import { RiWifiOffLine } from "react-icons/ri";

const ConnectionModal = () => {
    const clickRef = useRef(null)
	const dispatch = useDispatch();

    useEffect(() => {
        const handleOnline = () => {
            // Jalankan dispatch untuk status online
            dispatch(hiddenOffline());
        };

        // Bind event listeners
        window.addEventListener("online", handleOnline);

        return () => {
            // Cleanup event listeners
            window.removeEventListener("online", handleOnline);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickRef]);

    return (
        <Modal>
            <div className="flex flex-col justify-center items-center gap-3 w-screen h-screen px-3 md:px-5" >
                <RiWifiOffLine className='text-red-500 font-bold text-9xl' />
                <h3 className='font-semibold text-3xl text-center'>Anda sedang tidak dalam keadaan terhubung dengan internet.</h3>
            </div>
        </Modal>
    )
}

export default ConnectionModal