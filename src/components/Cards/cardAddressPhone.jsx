import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'

const CardAddressPhone = () => {
    const userData = useSelector(selectUserData);

    if (userData?.User_Phones?.length === 0 && userData?.User_Addresses?.length === 0) {
        return null; // Tidak menampilkan apa pun
    }

    const phones = [...(userData?.User_Phones || [])].sort((a, b) => b.Phone.is_main - a.Phone.is_main);
    const address = [...(userData?.User_Addresses || [])].sort((a, b) => b.Address.is_main - a.Address.is_main);
    return (
        <div className="bg-white w-full rounded-3xl flex justify-between py-4 px-6 shadow-md">
            <div className="flex flex-col gap-3 tracking-wider">
                {address.map((data, i) => (
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
                    {phones.map((data, i) => (
                        <div className="flex flex-col" key={i}>
                            <span className="text-xs md:text-sm font-light italic flex flex-row gap-2">
                                No. Telepon
                                {data.Phone.is_main ? <small className='font-medium'>(Utama)</small> : ""}
                            </span>
                            <h4 className="text-sm md:text-base font-medium">+{data.Phone.code}{data.Phone.phone_number}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardAddressPhone