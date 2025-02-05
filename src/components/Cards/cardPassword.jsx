import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HideIcon from '../../assets/icons/Hide.svg'
import EyeIcon from '../../assets/icons/Eye.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserData, signOut } from '../../features/user/userSlice';
import { changePassword } from '../../utilities/sendRequest';

const CardPassword = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false)
    const [isMatch, setIsMatch] = useState(true)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const userData = useSelector(selectUserData);

    useEffect(() => {
        newPassword === confirmNewPassword ? setIsMatch(true) : setIsMatch(false)
        const isReady = (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "" && newPassword === confirmNewPassword);
        setIsReady(isReady);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmNewPassword, newPassword, oldPassword])

    const [passwordsVisible, setPasswordsVisible] = useState({
        password: false,
        newPassword: false,
        retypeNewPassword: false,
    });

    const togglePasswordVisibility = () => {
        setPasswordsVisible({
        ...passwordsVisible,
        password: !passwordsVisible.password,
        });
    };

    const toggleNewPasswordVisibility = () => {
        setPasswordsVisible({
        ...passwordsVisible,
        newPassword: !passwordsVisible.newPassword,
        });
    };

    const toggleRetypePasswordVisibility = () => {
        setPasswordsVisible({
        ...passwordsVisible,
        retypeNewPassword: !passwordsVisible.retypeNewPassword,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsReady(false)

        const reqData = {
            old_password: oldPassword,
            new_password: newPassword,
        }

        changePassword(userData.nip, reqData).then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000
            });

            dispatch(signOut())
            navigate("/login")
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000
            });
        }).finally(() => {
            setIsReady(true)
        })

    }
    return (
        <div className="bg-white w-full rounded-3xl flex flex-col items-center gap-5 py-4 px-6 shadow-md">
            <h2 className="text-sm md:text-base font-semibold">Change Password</h2>
            <div className="w-full h-[1.5px] self-center bg-gray-200 rounded-3xl"></div>
            <form onSubmit={handleChangePassword} className="mt-2 flex flex-col gap-5 tracking-wider w-full">
                <input autoComplete="username" className='hidden' type='text' name='username' id='username' />
                <div className="flex flex-col gap-1">
                    <label htmlFor='old-password'className="text-xs md:text-sm font-light italic px-3">Old Password</label>
                    <div className="h-10 border border-graySecondary rounded-3xl w-full flex flex-row justify-between items-center pr-3 pl-1">
                        <input autoComplete='old-password'
                            id='old-password' name='old-password'
                            minLength={6}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type={passwordsVisible.password ? "text" : "password"}
                            className="h-full w-[93%] text-xs md:text-sm bg-white rounded-3xl px-3 focus:outline-none focus:ring-0 input-password" />
                        <img
                            src={passwordsVisible.password ? HideIcon : EyeIcon}
                            loading="eager"
                            alt="password"
                            onClick={togglePasswordVisibility}
                            className="h-4 md:h-5 w-4 md:w-5 cursor-pointer visible-password" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor='new-password' className="text-xs md:text-sm font-light italic px-3">New Password</label>
                    <div className="h-10 border border-graySecondary rounded-3xl w-full flex flex-row justify-between items-center pr-3 pl-1">
                        <input autoComplete='new-password'
                            id="new-password" name="new-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            minLength={6}
                            type={passwordsVisible.newPassword ? "text" : "password"}
                            className="h-full w-[93%] text-xs md:text-sm bg-white rounded-3xl px-3 focus:outline-none focus:ring-0 input-password" />
                        <img 
                            src={passwordsVisible.newPassword ? HideIcon : EyeIcon}
                            loading="eager"
                            alt="password"
                            onClick={toggleNewPasswordVisibility}
                            className="h-4 md:h-5 w-4 md:w-5 cursor-pointer visible-password" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label id='retype-password' className="text-xs md:text-sm font-light italic px-3">Re-type New Password</label>
                    <div className={`h-10 border ${isMatch ? "border-graySecondary" : "border-red-500"} rounded-3xl w-full flex flex-row justify-between items-center pr-3 pl-1`}>
                        <input autoComplete='retype-password'
                            id='retype-password' name='retype-password'
                            minLength={6}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            type={passwordsVisible.retypeNewPassword ? "text" : "password"}
                            className="h-full w-[93%] text-xs md:text-sm bg-white rounded-3xl px-3 focus:outline-none focus:ring-0 input-password" />
                        <img 
                            src={passwordsVisible.retypeNewPassword ? HideIcon : EyeIcon}
                            loading="eager"
                            alt="password"
                            onClick={toggleRetypePasswordVisibility}
                            className="h-4 md:h-5 w-4 md:w-5 cursor-pointer visible-password" />
                    </div>
                    {!isMatch
                        ? <small className='font-light text-xxs text-red-500 italic px-3'>Password baru tidak sesuai</small>
                        : ""
                    }
                </div>
                <div className="mt-5 w-full flex flex-col gap-4 tracking-wider py-3">
                    <button type="submit"
                        disabled={!isReady}
                        className={`w-full h-10 bg- rounded-3xl text-xs md:text-sm font-semibold tracking-wider ${isReady ? 'text-white bg-redPrimary cursor-pointer' : 'text-gray-800 bg-gray-300 cursor-wait'}`}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CardPassword