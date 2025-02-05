import { useEffect, useState } from 'react'
import ToTopIcon from '../../assets/icons/to-top.svg'

const ToTop = () => {
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShowTop(true)
            }else {
                setShowTop(false)
            }
        })
    }, [])

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

    return (
        <button
            onClick={goTop}
            className={` ${showTop ? "fixed" : "hidden"} z-30 bottom-16 mb-2 right-2 md:right-20 flex justify-center items-center h-9 w-9 border border-white bg-grayPrimary rounded-full drop-shadow-lg cursor-pointer animate__animated animate__slideInUp`}>
            <img loading="lazy" src={ToTopIcon} alt="top" className="block w-12 h-auto drop-shadow-4xl" />
        </button>
    )
}

export default ToTop