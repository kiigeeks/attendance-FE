import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { Pagination } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { setImage } from '../../features/image/imageSlice';

const Sliders = ({ datas }) => {
	const dispatch = useDispatch();
    return (
        <div className='w-full h-full relative  px-3 py-2 mb-5'>
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="text-center flex justify-center items-center gap-5 w-full h-[200px] absolute"
            >
                {datas.map((data) => (
                    <SwiperSlide
                        key={data.id}
                        className='h-full object-cover' onClick={() => dispatch(setImage(data.path))}
                    >
                        <img src={`${import.meta.env.VITE_API_PUBLIC_FOLDER_IMAGES}/${data.path}`} alt={data.title} className='w-full h-full object-contain'/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

Sliders.propTypes = {
    datas: PropTypes.array,
}

export default Sliders