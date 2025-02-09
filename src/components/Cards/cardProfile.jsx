
import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'
import Logo from '../../assets/Logo-VIP.png'
import UserIcon from '../../assets/icons/User.svg'

const CardProfile = () => {
    const userData = useSelector(selectUserData);
    return (
        <div className="w-full rounded-3xl flex flex-col gap-3 py-4 px-4 bg-gradient-to-tr from-yellowSecondary to-yellowPrimary shadow-md relative">
            <div className="flex w-full items-start">
                <div className="flex flex-1 items-center gap-2 md:gap-3 ml-1 md:ml-3 w-1/2">
                    <div className="w-11 h-11 rounded-full bg-white">
                        {userData.photo
                            ?
                                <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${userData.photo}`} alt="user" className="w-full h-full object-cover rounded-full" />
                            :
                                <img src={UserIcon} loading="eager" alt="user" className="w-full h-full object-cover rounded-full" />
                        }
                    </div>
                    <div className="w-48 md:w-72 text-white truncate">
                        <span className="text-lg md:text-xl font-semibold tracking-wider">
                            {userData.fullname}
                        </span>
                    </div>
                </div>
                {/* <div className="flex flex-initial p-0 md:p-1 w-16 bg-red-300">
                    <img src={BinarLogo} loading="eager" alt="binar" className="w-full h-full object-contain object-top" />
                </div> */}
            </div>
            
            <div className="absolute top-0 right-0 w-20 bg-white py-2 px-5 rounded-se-3xl rounded-es-3xl">
                <img src={Logo} loading="eager" alt="Logo" className="w-full h-full object-contain object-top" />
            </div>
            
            <div className="flex h-full py-5 justify-between gap-10 items-start">
                <div className="flex flex-col gap-2 text-white tracking-wider">
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-light">Divisi</span>
                        <h4 className="text-sm md:text-base font-semibold">{userData.Biodata?.Office?.name}</h4>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-light">Eselon</span>
                        <h4 className="text-sm md:text-base font-semibold">{userData.Biodata?.Echelon?.title}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile