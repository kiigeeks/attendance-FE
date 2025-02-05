import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Modal from '../../components/Modal'
import { link, resetImage } from './imageSlice'

const ImageModal = () => {
    const clickRef = useRef(null)
	const dispatch = useDispatch();
    const linkImage = useSelector(link);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                dispatch(resetImage())
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

    return (
        <Modal>
            <div ref={clickRef} className="flex flex-col gap-3 rounded-lg h-11/12 md:h-[700px]" >
                <img
                    className='w-full h-full rounded-lg object-contain'
                    src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${linkImage}`} 
                    alt='Capture'
                    loading='eager'
                />
            </div>
        </Modal>
    )
}

export default ImageModal