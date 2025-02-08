import { useState } from 'react'
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import { decodeToken } from "react-jwt";
import Logo from '../../../public/assets/images/Logo-VIP.png'
import HideIcon from '../../assets/icons/Hide.svg'
import EyeIcon from '../../assets/icons/Eye.svg'
import { signIn } from '../../features/user/userSlice'
import { loginUser } from '../../utilities/sendRequest'

const Login = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [nip, setNip] = useState("")
    const [password, setPassword] = useState("")
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const userCredentials = {
            nip,
            password,
        }

        loginUser(userCredentials).then((res) => {
            const token = res.payload.accessToken;
            localStorage.setItem('_AbHc', token);
            const decodedToken = decodeToken(token);
            
            const userData = { 
                nip: decodedToken.nip,
                fullname: decodedToken.fullname, 
                email: decodedToken.email, 
                photo: decodedToken.photo,
                is_admin: decodedToken.is_admin,
                exp: decodedToken.exp, 
            }
        
            dispatch(signIn(userData))
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }
    
    return (
        <section className="flex flex-col py-10 md:max-w-[500px] min-h-screen w-full">
            {/* title */}
            <div className="flex flex-col items-center gap-3">
                <h3 className="text-sm md:text-base uppercase leading-5 tracking-wider font-semibold">
                    welcome to
                </h3>
                <div className="w-3/5">
                    <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <p className="text-xl md:text-2xl tracking-widest font-bold">
                    Driving to Excellence
                </p>
            </div>
            {/* form */}
            <div className="mt-16 w-full flex items-center justify-center">
                <form className="flex flex-col w-11/12 gap-3 md:gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor='nip' className="text-center text-xs md:text-sm">Nomor Induk Pegawai</label>
                        <input type="text" id='nip' name='nip' 
                            autoComplete="username" onChange={(e) => setNip(e.target.value)} className="h-10 text-xs md:text-sm rounded-3xl px-2 md:px-3 focus:outline-none focus:ring-0" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='password' className="text-center text-xs md:text-sm">Password</label>
                        <div id='password' className="h-10 bg-white rounded-3xl w-full flex flex-row justify-between items-center pr-3 pl-1">
                            <input
                                id='password'
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-full w-[93%] text-xs md:text-sm bg-white rounded-3xl px-3 focus:outline-none focus:ring-0 input-password"
                            />
                            <div role='button' onClick={handleShowPassword}>
                                <img
                                    src={showPassword ? HideIcon : EyeIcon}
                                    loading="eager"
                                    alt="password"
                                    className={`h-4 md:h-5 w-4 md:w-5 cursor-pointer`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="-mt-2 text-xxs md:text-xs italic text-right mr-3 underline underline-offset-2 text-gray-500 cursor-pointer">
                        Lupa Password
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <button
                            type='submit'
                            onClick={handleLogin}
                            disabled={isLoading}
                            className={`${isLoading ? 'text-white bg-grayPrimary cursor-wait' : 'text-white bg-yellowSecondary cursor-pointer'}
                                h-10 flex justify-center items-center text-xs md:text-sm font-bold uppercase tracking-wider rounded-3xl`}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <footer className="p-1 mt-auto w-full text-center text-xxs md:text-xs font-light italic text-gray-500 tracking-wider">
                Copyright @ <span className='font-semibold text-xs md:text-sm'>BIT</span>
            </footer>
        </section>
    )
}

export default Login