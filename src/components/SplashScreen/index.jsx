import { useEffect, useState } from 'react'
import Star from '../../assets/logo-star.png'

const SplashScreen = () => {
    const [effect, setEffect] = useState("")
    
    useEffect(() => {
        setTimeout(() => {
            setEffect("animate__fadeOut")
        }, 1500)
    }, [])

    return (
        <div className={`w-screen h-screen flex justify-center items-center backdrop-blur-sm bg-white animate__animated ${effect}`}>
            <div className='w-44 h-44 rounded-lg'>
                <img src={Star} alt="Logo" className='w-full h-full object-contain rounded-lg'/>
            </div>
        </div>
    )
}

export default SplashScreen