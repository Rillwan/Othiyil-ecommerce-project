/* eslint-disable no-unused-vars */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { HomeData } from './HomeData';
import { motion } from 'framer-motion';
// import Logo from "../../../assets/bannerLogo.jpg"
import { Link } from 'react-router-dom';

const BannerSlider = () => {
    return (
        <div>
            <>
                <Swiper
                    spaceBetween={10}
                    effect={'fade'}
                    pagination={{
                        clickable: true,
                    }}
                    slidesPerView={1}
                    loop={true}
                    speed={1800}
                    autoplay={{
                        delay: 2400,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectFade, Autoplay, Navigation]}
                    className="mySwiper"
                >
                    {
                        HomeData?.hero_section?.map((item, i) => (
                            <SwiperSlide key={i} className='relative'>
                                <div className=" bg-slate-500 min-h-screen bg-cover bg-center rounded-t-[38px] flex items-center justify-center shadow-inset-md"
                                    style={{ backgroundImage: `url('${item.img}')` }}>
                                    <motion.div
                                        initial={{ scale: 3, opacity: 0 }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            transition: { delay: 1, duration: 0.15, ease: 'easeIn' }
                                        }}
                                        className="text-center px-4 drop-shadow-2xl relative z-[1]">
                                        <h2 className="text-5xl md:text-7xl text-white text-wrap md:w-[80%] mx-auto">{item.title}</h2>
                                        <p className="mt-4 md:mt-2 text-lg text-white font-light opacity-80 tracking-[1px]">{item.description}</p>
                                        <Link to={'/all-products'} className="block mx-auto w-fit mt-4 px-6 py-3 btn bg-white text-black rounded-3xl tracking-[1px]">Explore Our Products</Link>
                                        {/* <img className='mx-auto mt-5 w-[80px] aspect-square bg-black p-1 object-cover rounded-full' src={Logo} alt="" /> */}
                                    </motion.div>
                                    <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </>
        </div>
    )
}

export default BannerSlider
