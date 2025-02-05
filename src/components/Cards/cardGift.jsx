import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';
import { getStatusRewards } from '../../utilities/helpers';
import { Link } from 'react-router-dom';
import { HiOutlineGift } from "react-icons/hi2";


const CardGift = () => {
    const userData = useSelector(selectUserData);
    const rewardLogs = userData.Obtained_Reward_Log;

    if (!rewardLogs || rewardLogs.length === 0) {
        return null; // Tidak menampilkan apa pun jika rewardLogs kosong
    }

    const latestData = rewardLogs.reduce((latest, current) => {
        return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest;
    }, rewardLogs[0]);

    return (
        <Link to={"/my-rewards"} className="bg-white w-full rounded-3xl flex py-5 px-4 cursor-pointer shadow-md">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-initial text-graySecondary text-sm md:text-base font-semibold">
                    Hadiah
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex text-xs md:text-sm font-semibold tracking-wider">
                        {latestData.Reward.title}
                    </div>
                    <div className={`py-1 px-3 flex text-xxs md:text-xs text-white italic tracking-wider font-light w-fit rounded-full ${getStatusRewards(latestData.status)}`}>
                        {latestData.status}
                    </div>
                </div>
            </div>
            <div className="flex flex-initial justify-center items-center">
                <HiOutlineGift className="w-16 h-16 text-grayPrimary"/>
            </div>
        </Link>
    )
}

export default CardGift