import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'
import { dateIndo } from "../../utilities/helpers";

const CardStatus = () => {
    const userData = useSelector(selectUserData);
    return (
        <div className="bg-white w-full rounded-3xl flex justify-between py-4 px-6 shadow-md">
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Divisi</span>
                    <h4 className="text-xxs md:text-sm font-semibold">{userData.Biodata?.Office?.name}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">NIP</span>
                    <h4 className="text-xxs md:text-sm font-semibold">{userData.nip}</h4>
                </div>
            </div>
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Eselon</span>
                    <h4 className="text-xxs md:text-sm font-semibold">{userData.Biodata?.Echelon?.title}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Tanggal Masuk</span>
                    <h4 className="text-xxs md:text-sm font-semibold">{userData.Biodata && dateIndo(userData.Biodata?.hire_date)}</h4>
                </div>
            </div>
        </div>
    )
}

export default CardStatus