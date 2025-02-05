import { useSelector } from "react-redux"
import { selectUserData } from '../../features/user/userSlice'
import { dateIndo } from "../../utilities/helpers";

const CardInformation = () => {
    const userData = useSelector(selectUserData);
    return (
        <div className="relative bg-white w-full rounded-3xl flex justify-between py-4 px-6 shadow-md">
            <div className="absolute top-0 right-0 w-auto flex flex-col gap-2 tracking-wider p-3">
                <a
                    href={`https://api.whatsapp.com/send/?text=Selamat Pagi, Saya ${userData?.firstname} ${userData?.lastname}, Ingin Mengupdate Data Diri Saya &phone=+6281259805552`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-fit mr-4 text-blue-500 underline underline-offset-4 text-xs font-normal tracking-widest">
                    Update Data
                </a>
            </div>
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">NIK</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.id_card}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Nama Lengkap</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.fullname}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">E-Mail</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.email}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Jenis Kelamin</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata?.gender}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Tanggal Lahir</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata && dateIndo(userData.Biodata?.birthday)}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Pendidikan Terakhir</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata?.last_education}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Status Perkawinan</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata?.marital_status}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Agama</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata?.religion}</h4>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-light italic">Kota Kelahiran</span>
                    <h4 className="text-sm md:text-base font-medium">{userData.Biodata?.hometown}</h4>
                </div>
            </div>
        </div>
    )
}

export default CardInformation