import { IoCalendarClearOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/user/userSlice";

const CardAnnual = () => {
    const userData = useSelector(selectUserData);

    return (
        <div className="bg-white w-full rounded-3xl flex py-5 px-4 shadow-md">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-initial text-graySecondary text-sm md:text-base font-semibold">
                    Cuti
                </div>
                <div className="flex flex-1 items-center gap-2">
                    <div className="flex text-2xl md:text-3xl font-semibold tracking-wider">
                        {userData.remainingAnnualLeave}
                    </div>
                    <div className="flex text-2xl md:text-3xl font-light tracking-wider">
                        Hari
                    </div>
                </div>
            </div>
            <div className="flex flex-initial justify-center items-center">
                <IoCalendarClearOutline className="w-16 h-16 text-grayPrimary"/>
            </div>
        </div>
    )
}

export default CardAnnual