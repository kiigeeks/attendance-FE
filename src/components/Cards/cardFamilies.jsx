import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'

const CardFamilies = () => {
    const userData = useSelector(selectUserData);

    if (userData?.Families?.length === 0) {
        return null; // Tidak menampilkan apa pun
    }
    
    return (
        <div className="bg-white w-full rounded-3xl flex justify-between py-4 px-6 shadow-md">
            <div className="flex flex-col gap-10 tracking-wider">
                {userData?.Families?.map((family, i) => (
                    <div className="flex flex-col gap-3 tracking-wider" key={i}>
                        <div className="flex flex-col">
                            <span className="text-xs md:text-sm font-light italic">{family.status}</span>
                            <h4 className="text-sm md:text-base font-medium">{family.fullname}</h4>
                        </div>
                        {[...(family?.Family_Addresses || [])].sort((a, b) => b.Address.is_main - a.Address.is_main).map((data, x) => (
                            <div className="flex flex-col" key={x}>
                                <span className="text-xs md:text-sm font-light italic flex flex-row gap-2">
                                    Alamat
                                    {data.Address.is_main ? <small className='font-medium'>(Utama)</small> : ""}
                                </span>
                                <h4 className="text-sm md:text-base font-medium">
                                    {data.Address.name}, {data.Address.Indonesia_Village.name}, {data.Address.Indonesia_Village.Indonesia_District.name}, {data.Address.Indonesia_Village.Indonesia_District.Indonesia_City.name}, {data.Address.Indonesia_Village.Indonesia_District.Indonesia_City.Indonesia_Province.name} - {data.Address.postal_code}
                                </h4>
                            </div>
                        ))}
                        {[...(family?.Family_Phones || [])].sort((a, b) => b.Phone.is_main - a.Phone.is_main).map((data, x) => (
                            <div className="flex flex-col" key={x}>
                                <span className="text-xs md:text-sm font-light italic flex flex-row gap-2">
                                    No. Telepon
                                    {data.Phone.is_main ? <small className='font-medium'>(Utama)</small> : ""}
                                </span>
                                <h4 className="text-sm md:text-base font-medium">+{data.Phone.code}{data.Phone.phone_number}</h4>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardFamilies