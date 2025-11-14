import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import ApiURL from './../../../Hooks/API/API';
import { TextLimit } from '../../../components/Optimized/TextLimit';

const VideoSlider = ({ videos }) => {

    return (
        <div className='mt-20'>
            <div className="mx-4">
                <h3 className="text-4xl text-center">Product Reels</h3>
                <div className='mt-8 rounded-3xl overflow-hidden'>
                    <Swiper
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        loop={true}
                        slidesPerView={1}
                        centeredSlides={true}
                        spaceBetween={6}
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Navigation]}
                        autoplay={{
                            delay: 15000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.next-swiper-button-home',
                            prevEl: '.prev-swiper-button-home'
                        }}
                        className="swiper__container py-14 transition-all"
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 6,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 6,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 6,
                            },
                        }}
                    >
                        {
                            videos?.map((item, index) => (
                                <SwiperSlide
                                    key={index} className='relative'>
                                    <div className='card relative rounded-3xl overflow-hidden'>
                                        <div className='w-full aspect-[2/3] bg-cover bg-center shadow-inset'>
                                            <video
                                                src={`${ApiURL}/image/video/:100/${item?.video}`}
                                                width="600"
                                                // controls
                                                autoPlay
                                                muted
                                                loop
                                                // playsInline
                                                className='h-full object-cover'
                                            />
                                        </div>
                                        <div className='absolute left-0 bottom-0 pb-5 z-50 w-full'>
                                            <div className='p-4 '>
                                                <h4 className=' uppercase text-white font-medium'>{item?.name}</h4>
                                                <div className='text-slate-200 text-[12px] font-light'>
                                                    <TextLimit text={item?.description} limit={35} /> 
                                                </div>
                                            </div>
                                            <div className='w-full'>
                                                <Link to={`/category/${item?.slug}`} className='text-[13px] text-center bg-white px-6 opacity-40 hover:opacity-100 transition-all py-3 inline-block w-full'>View More</Link>
                                            </div>
                                        </div>
                                        {/* <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl opacity-80 cursor-pointer'>
                                            <FaPlay />
                                        </div> */}
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default VideoSlider
