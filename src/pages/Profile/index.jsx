import { useEffect, useRef, useState } from 'react'
import AvatarIcon from '../../assets/icons/Male-User.svg'
import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'
import CardOffice from '../../components/Cards/cardOffice';
import CardAddressPhone from '../../components/Cards/cardAddressPhone';
import CardFamilies from '../../components/Cards/cardFamilies';
import CardInformation from '../../components/Cards/cardInformation';
import CardStatus from '../../components/Cards/cardStatus';
import CardPassword from '../../components/Cards/cardPassword';

const Profile = () => {
    const [more, setMore] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const userData = useSelector(selectUserData);
    const cardRef = useRef(null);

    useEffect(() => {
        if (changePassword) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            setChangePassword(false);
                        }
                    });
                },
                { threshold: 0.1 } // Sesuaikan threshold sesuai kebutuhan
            );

            if (cardRef.current) {
                observer.observe(cardRef.current);
            }

            return () => {
                if (cardRef.current) {
                    observer.unobserve(cardRef.current);
                }
            };
        }
    }, [changePassword]);

    return (
        <>
            {/* profile pictures */}
            <div className="mb-3 flex justify-center items-center w-full">
                <div className="bg-white border-2 border-white w-36 h-36 rounded-full shadow-md">
                {userData.photo
                    ?
                        <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${userData.photo}`} alt="user" className="w-full h-full object-cover rounded-full" />
                    :
                        <img src={AvatarIcon} loading="eager" alt="user" className="w-full h-full object-cover rounded-full object-top" />
                }
                </div>
            </div>

            {/* card Profile 1 */}
            <CardStatus />

            {/* card Profile 2 */}
            <CardInformation />
            
            {more
                ?
                    <>
                        {/* card Profile 3 */}
                        <CardOffice />
                        
                        {/* card Profile 4 */}
                        <CardAddressPhone />
                        
                        {/* card Profile 5 */}
                        <CardFamilies />

                        <button
                            onClick={() => setMore(false)}
                            className="w-fit self-center py-2.5 text-blue-500 underline underline-offset-1 text-sm font-normal tracking-wider">
                            {/* className="w-11/12 self-center py-2.5 border border-grayPrimary bg-grayPrimary rounded-2xl text-xs md:text-sm font-normal tracking-wider"> */}
                            Hide
                        </button>
                    </>
                :
                    <button
                        onClick={() => setMore(true)}
                        className="w-fit self-center py-2.5 text-blue-500 underline underline-offset-1 text-sm font-normal tracking-wider">
                        {/* className="w-11/12 self-center py-2.5 border border-grayPrimary bg-grayPrimary rounded-2xl text-xs md:text-sm font-normal tracking-wider"> */}
                        More Information
                    </button>
            }
            
            <div className="w-1/2 h-[2px] self-center bg-gray-400 rounded-3xl"></div>
            
            {changePassword
                ?
                    <div className='w-full' ref={cardRef}>
                        {/* card change password */}
                        <CardPassword />
                    </div>
                :
                    <button
                        onClick={() => setChangePassword(true)}
                        className="w-full self-center py-5 bg-white shadow-md rounded-2xl text-sm font-normal tracking-wider">
                        Ubah Password
                    </button>
            }
        </>
    )
}

export default Profile