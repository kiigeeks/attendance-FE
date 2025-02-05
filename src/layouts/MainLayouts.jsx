import { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { decodeToken } from "react-jwt";
import { signOut } from '../features/user/userSlice';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import { setNavigate } from '../utilities/helpers';

const MainLayouts = () => {
	const dispatch = useDispatch();
    const navigate = useNavigate();
    setNavigate(navigate); //untuk function navigate pada slice redux

    useEffect(() => {
		const currentDate = new Date();
		if (localStorage.getItem('_AbHc')) {
			const token = decodeToken(localStorage.getItem('_AbHc'));

			if(token.exp * 1000 < currentDate.getTime()){
				dispatch(signOut())
                navigate('/login');
			}
		}
    }, [dispatch, navigate])

    return (
        <main className="md:max-w-[500px] min-h-screen h-full w-full md:w-[500px] relative">
            {/* header */}
            <Header />
            
            {/* content */}
            <section className="mt-3 mb-20 px-3 pb-7 flex flex-col gap-5 w-screen md:w-[500px]">
                <Outlet />
            </section>
            
            {/* navigationbar --> */}
            <NavigationBar />
        </main>
    )
}

export default MainLayouts