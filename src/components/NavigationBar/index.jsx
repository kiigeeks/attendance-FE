
import { Link, useLocation } from 'react-router-dom'
import { IoBookSharp, IoNewspaperOutline, IoGrid, IoGiftOutline, IoPersonCircleOutline } from "react-icons/io5";


const NavigationBar = () => {
    const location = useLocation();
    return (
        <section className="fixed bottom-0 z-40 rounded-t-3xl bg-white h-16 md:max-w-[500px] w-full flex justify-center shadow-navigation">
            <div className="flex justify-between items-center w-4/5">
                <div className="flex flex-col items-center gap-1 relative">
                    <Link to={"/news"} className="w-8 h-8 cursor-pointer">
                        <IoNewspaperOutline className={`w-full h-full ${location.pathname.includes('/news') ? 'text-yellowSecondary' : 'text-grayPrimary'}`} />
                    </Link>
                </div>
                {/* <div className="flex flex-col items-center gap-1 relative">
                    <Link to={"/educations"} className="w-8 h-8 cursor-pointer">
                        <IoBookSharp className={`w-full h-full ${location.pathname.includes("educations") ? 'text-yellowSecondary' : 'text-grayPrimary'}`} />
                    </Link>
                </div> */}
                <div className="flex flex-col items-center gap-1 relative">
                    <Link to={"/"} className="w-8 h-8 cursor-pointer">
                        <IoGrid className={`w-full h-full ${(location.pathname === '/' || location.pathname.includes('/points') || location.pathname.includes('/my-rewards')) ? 'text-yellowSecondary' : 'text-grayPrimary'}`}  />
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-1 relative">
                    <Link to={"/rewards"} className="w-8 h-8 cursor-pointer">
                        <IoGiftOutline className={`w-full h-full ${location.pathname.includes('/rewards') ? 'text-yellowSecondary' : 'text-grayPrimary'}`} />
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-1 relative">
                    <Link to={"/profile"} className="w-8 h-8 cursor-pointer">
                        <IoPersonCircleOutline className={`w-full h-full ${location.pathname.includes('/profile') ? 'text-yellowSecondary' : 'text-grayPrimary'}`} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NavigationBar