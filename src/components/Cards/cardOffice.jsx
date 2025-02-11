import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'
import { dateIndo } from "../../utilities/helpers";

const CardOffice = () => {
    const userData = useSelector(selectUserData);
    
    return (
        <div className="bg-white w-full rounded-3xl flex justify-between py-4 px-6 shadow-md">
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Jabatan</span>
                    <h4 className="text-sm md:text-base font-medium">
                        {userData.Positions.map((pos) => pos.title).join(", ")}
                    </h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Status Karyawan</span>
                    <h4 className="text-sm md:text-base font-medium">
                        {userData.is_permanent
                            ?
                                "Karyawan Tetap"
                            :
                                userData.Employment_Periode?.Employment_Status?.name
                        }
                    </h4>
                </div>
                {!userData.is_permanent
                    ?
                        <div className="flex flex-col">
                            <span className="text-xs md:text-sm font-light italic">Masa Kerja</span>
                            <h4 className="text-sm md:text-base font-medium">
                                {userData.Employment_Periode ? dateIndo(userData.Employment_Periode.period) : "-"}
                            </h4>
                        </div>
                    : ""
                }
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Office</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata?.Office?.name}</h4>
                </div>
                {[...(userData?.Biodata.Office.Office_Addresses || [])].sort((a, b) => b.Address.is_main - a.Address.is_main).map((data, i) => (
                    <div className="flex flex-col" key={i}>
                        <span className="text-xs md:text-sm font-light italic flex flex-row gap-2">
                            Alamat
                            {data.Address.is_main ? <small className='font-medium'>(Utama)</small> : ""}
                        </span>
                        <h4 className="text-sm md:text-base font-medium">
                            {data.Address.name}, {data.Address.Indonesia_Village.name}, {data.Address.Indonesia_Village.Indonesia_District.name}, {data.Address.Indonesia_Village.Indonesia_District.Indonesia_City.name}, {data.Address.Indonesia_Village.Indonesia_District.Indonesia_City.Indonesia_Province.name} - {data.Address.postal_code}
                        </h4>
                    </div>
                ))}
                <div className='mt-5 flex flex-col gap-3 '>
                    {[...(userData?.Biodata.Office.Office_Phones || [])].sort((a, b) => b.Phone.is_main - a.Phone.is_main).map((data, i) => (
                        <div className="flex flex-col" key={i}>
                            <span className="text-xs md:text-sm font-light italic flex flex-row gap-2">
                                No. Telepon
                                {data.Phone.is_main ? <small className='font-medium'>(Utama)</small> : ""}
                            </span>
                            <h4 className="text-sm md:text-base font-medium">{data.Phone.phone_number}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardOffice