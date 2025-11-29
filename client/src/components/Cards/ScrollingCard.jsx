// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { Autoplay, EffectCreative } from 'swiper/modules';
import { motion } from 'framer-motion';

const ScrollingCard = ({ Images }) => {
    return (
        <motion.div
            initial={{
                x: 150,
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                    delay: 0.2,
                    type: "easeIn",
                    duration: 0.8,
                }
            }}
        >
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                autoplay={{
                    delay: 2400,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[EffectCreative, Autoplay]}
                className="mySwiper sm:w-[400px] aspect-square w-[280px] mx-auto mt-4 sm:mt-10"
            >
                {
                    Images?.map((img, i) => (
                        <SwiperSlide key={i} className='sm:p-2'>
                            <img className='object-center object-cover w-fit h-full' src={img} alt="image" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </motion.div>
    )
}

export default ScrollingCard
