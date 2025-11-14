/* eslint-disable no-unused-vars */
import { LuMoveRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import VideoSlider from "./VideoSlider";
import { AboutData, HomeData } from "./HomeData";
import { useSelector } from "react-redux";
import ApiURL from "../../../Hooks/API/API";
import BannerSlider from "./BannerSlider";
import { TextLimit } from "../../../components/Optimized/TextLimit";
import { useEffect, useState } from "react";
import ClientImages from './ClientImages';
import { motion } from 'framer-motion';
import Counter from "../../../components/Counter/Counter";
import './Home.css'
import ProductCard from "../../../components/Cards/ProductCard";

const HomePage = () => {
    const [activeCategory, setActiveCategory] = useState([]);
    const { products, category, videos } = useSelector((state) => state.home);

    useEffect(() => {
        if (category?.length > 0) {
            category?.map((item) => {
                if (item?.active) {
                    activeCategory.push(item)
                    setActiveCategory([...activeCategory])
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return (
        <div className="bg-white">
            {/* HERO SECTION */}
            <BannerSlider />
            {/* CATEGORY  */}
            <div className="mt-2">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-wrap">
                        <div className="flex flex-col gap-2 cursor-pointer">
                            <Link className="bg-cover relative bg-center h-[280px] lg:h-[350px]  transition-all"
                                to={`/category/${videos[0]?.slug}`}
                            >
                                <div className="absolute top-0 w-full h-full left-0 z-[0]">
                                    <video
                                        src={`${videos[0]?.video && (`${ApiURL}/image/video/:100/${videos[0]?.video}`)}`}
                                        // controls
                                        autoPlay
                                        muted
                                        loop
                                        // playsInline
                                        className='h-full object-cover object-center w-full'
                                    />
                                </div>
                                <div className="cursor-pointer absolute top-0 left-0 z-[1] w-full h-full bg-black/10">
                                    <motion.div
                                        initial={{ y: +100, opacity: 0 }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                            transition: { delay: 0.5, duration: 0.4, ease: 'easeIn' }
                                        }}
                                        className="p-6 text-white"
                                    >
                                        <h3 className="text-3xl tracking-[4px] font-light uppercase">{videos[0]?.name}</h3>
                                        <p className="opacity-80 text-[13px] font-thin uppercase tracking-[4px]">{videos[0]?.category?.name}</p>
                                    </motion.div>
                                </div>
                            </Link>
                            <Link className="bg-cover relative bg-center h-[300px] lg:h-[450px]"
                                to={`/category/${videos[2]?.slug}`}
                            >
                                <div
                                    className="absolute top-0 w-full h-full left-0 z-[0]">
                                    <video
                                        src={`${videos[2]?.video && (`${ApiURL}/image/video/:100/${videos[2]?.video}`)}`}
                                        // controls
                                        autoPlay
                                        muted
                                        loop
                                        // playsInline
                                        className='h-full object-cover object-center w-full'
                                    />
                                </div>
                                <div className="cursor-pointer absolute top-0 left-0 z-[1] w-full h-full bg-black/10">
                                    <motion.div
                                        initial={{ y: +100, opacity: 0 }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                            transition: { delay: 0.5, duration: 0.4, ease: 'easeIn' }
                                        }}
                                        className="p-6 text-white"
                                    >
                                        <h3 className="text-3xl tracking-[4px] font-light uppercase">{videos[2]?.name}</h3>
                                        <p className="opacity-80 text-[13px] font-thin uppercase tracking-[4px]">{videos[2]?.category?.name}</p>
                                    </motion.div>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link className="bg-cover relative bg-center h-[300px] lg:h-[450px]"
                                to={`/category/${videos[1]?.slug}`}
                            >
                                <div className="absolute top-0 w-full h-full left-0 z-[0]">
                                    <video
                                    src={`${videos[1]?.video && (`${ApiURL}/image/video/:100/${videos[1]?.video}`)}`}
                                        // controls
                                        autoPlay
                                        muted
                                        loop
                                        // playsInline
                                        className='h-full object-cover object-center w-full'
                                    />
                                </div>
                                <div className="cursor-pointer absolute top-0 left-0 z-[1] w-full h-full bg-black/10">
                                    <motion.div
                                        initial={{ y: +100, opacity: 0 }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                            transition: { delay: 0.5, duration: 0.4, ease: 'easeIn' }
                                        }}
                                        className="p-6 text-white"
                                    >
                                        <h3 className="text-3xl tracking-[4px] font-light uppercase">{videos[1]?.name}</h3>
                                        <p className="opacity-80 text-[13px] font-thin uppercase tracking-[4px]">{videos[1]?.category?.name}</p>
                                    </motion.div>
                                </div>
                            </Link>
                            <Link className="bg-cover relative bg-center h-[280px] lg:h-[350px] "
                                to={`/category/${videos[4]?.slug}`}
                            >
                                <div className="absolute top-0 w-full h-full left-0 z-[0]">
                                    <video
                                        src={`${videos[4]?.video && (`${ApiURL}/image/video/:100/${videos[4]?.video}`)}`}
                                        // controls
                                        autoPlay
                                        muted
                                        loop
                                        // playsInline
                                        className='h-full object-cover object-center w-full'
                                    />
                                </div>
                                <div className="cursor-pointer absolute top-0 left-0 z-[1] w-full h-full bg-black/10">
                                    <motion.div
                                        initial={{ y: +100, opacity: 0 }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                            transition: { delay: 0.5, duration: 0.4, ease: 'easeIn' }
                                        }}
                                        className="p-6 text-white"
                                    >
                                        <h3 className="text-3xl tracking-[4px] font-light uppercase">{videos[4]?.name}</h3>
                                        <p className="opacity-80 text-[13px] font-thin uppercase tracking-[4px]">{videos[4]?.category?.name}</p>
                                    </motion.div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* ABOUT  */}
            <div className="mt-6 md:mt-10 lg:mt-20">
                <div className="container">
                    <div className="grid xl:grid-cols-2 gap-10 lg:gap-6">
                        <div className="lg:pr-16">
                            <h2 className="text-5xl font-medium mt-10 md:mt-20">
                                {HomeData.about_section.title}
                            </h2>
                            <div className="overflow-hidden">
                                <motion.p
                                    initial={{
                                        x: 100,
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        x: 0,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            duration: 1,
                                        }
                                    }}
                                    className="mt-4 relative text-gray-600 text-[15px]">
                                    {HomeData.about_section.description}
                                </motion.p>
                            </div>
                            <Link
                                to={'/about'}>
                                <motion.div
                                    className="flex item-center border-b mt-6 w-fit"
                                    initial={{ opacity: 0 }}
                                    whileInView={{
                                        x: 0,
                                        opacity: 1,
                                        transition: { delay: 0.3, duration: 1, ease: 'easeIn' }
                                    }} >
                                    <p className="text-[13px]">Know More</p>
                                    <LuMoveRight className="ml-10" />
                                </motion.div>
                            </Link>
                        </div>
                        <div className="flex gap-5">
                            <motion.div className="pt-20"
                                animate={{
                                    width: ["80%", "20%", "80%"], // opposite of first box
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="w-full h-[1px] bg-black/50 mb-3"></div> 
                                <motion.img
                                    initial={{ y: -80 }}
                                    whileInView={{
                                        y: 0,
                                        transition: { delay: 0.1, duration: 0.4, ease: 'easeIn' }
                                    }}
                                    className="h-full object-cover min-h-[300px]" src={AboutData?.banner1} alt="" />
                            </motion.div>
                            <motion.div className="pb-20"
                                animate={{
                                    width: ["20%", "80%", "20%"], // opposite of first box
                                }}
                                transition={{
                                    duration: 15, 
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <motion.img
                                    initial={{ y: +80 }}
                                    whileInView={{
                                        y: 0,
                                        transition: { delay: 0.1, duration: 0.4, ease: 'easeIn' }
                                    }}
                                    className="h-full object-center object-cover" src={AboutData?.banner2} alt="" />
                                    <div className="w-full h-[1px] bg-black/50 mt-3"></div> 
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* COUNT */}
            <div className="mt-10 lg:mt-20">
                <div className="container">
                    <div className="">
                        <ul className="flex gap-8 text-center justify-center flex-wrap gap-y-14">
                            <li className="w-[250px]">
                                <h3 className="text-7xl flex items-start justify-center">
                                    <Counter from={0} to={3} duration={2} suffix="" />
                                    <span className="text-5xl">+</span></h3>
                                <p className="text-gray-600 text-[14px]">Years of Trusted Service</p>
                            </li>
                            <li className="w-[250px]">
                                <h3 className="text-7xl flex items-start justify-center">
                                    <Counter from={0} to={20} duration={4} suffix="" />k<span className="text-5xl">+</span></h3>
                                <p className="text-gray-600 text-[14px]">Complete Home & Building Solutions</p>
                            </li>
                            <li className="w-[250px]">
                                <h3 className="text-7xl flex items-start justify-center">
                                    <Counter from={0} to={98} duration={6} suffix="" /><span className="text-4xl">%</span></h3>
                                <p className="text-gray-600 text-[14px]">End-to-End Product Range</p>
                            </li>
                            <li className="w-[250px]">
                                <h3 className="text-7xl flex items-start justify-center">
                                    <Counter from={0} to={100} duration={8} suffix="" /><span className="text-4xl">%</span></h3>
                                <p className="text-gray-600 text-[14px]">Preferred Choice of Builders & Homeowners in Calicut</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* PRODUCT */}
            <div className="mt-16 lg:mt-20">
                <div className="container">
                    <div className="flex justify-between items-center flex-wrap">
                        <h2 className="text-3xl md:text-4xl font-medium mx-auto md:mx-0">Exclusive Collections</h2>
                        <Link to={'/all-products'} className="border-b flex items-center mt-4 mx-auto md:mx-0 md-mt-0">All products <span className="ml-10"><LuMoveRight /></span></Link>
                    </div>
                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                products?.map((item, index) => (
                                    <div key={index}>
                                        <ProductCard data={item} i={index} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Benefits section */}
            <div className="mt-10 lg:mt-20">
                <div className="container">
                    <h3 className="text-3xl text-center">Why Choose Othiyil for Your Home & Building Needs?</h3>
                    <p className="text-[17px] text-gray-600 text-center mt-2">“Your trusted partner for construction and interior solutions.”</p>
                    <div className="grid  md:grid-cols-2  lg:grid-cols-3 gap-6 mt-16">
                        {
                            HomeData?.whyChooseUs?.map((item, index) => (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        transition: {
                                            delay: 0.3 * index,
                                            type: "spring",
                                            duration: 1,
                                        }
                                    }}
                                    key={index} className="group text-center bg-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="p-5 pb-8">
                                        <div className="flex justify-center items-center mt-4">
                                            {
                                                item?.Icon && <item.Icon className="text-4xl" />
                                            }
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="font-medium">{item?.title}</h4>
                                            <p className="max-w-[400px] text-gray-600 text-[14px] mt-2">{item?.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* Video Slider */}
            <VideoSlider videos={videos} />
            {/* LOGO */}
            <div className="mt-10 lg:mt-20">
                <div className="container">
                    <h3 className="text-3xl text-center">Proud Official Partners</h3>
                    <p className="text-[17px] text-gray-600 text-center mt-2">“Our growing network of trusted brand collaborations means better products.”</p>
                    <div className="gap-1 flex items-center justify-center flex-wrap mt-8">
                        {
                            ClientImages?.map((item, index) => (
                                <motion.div
                                    whileInView={{
                                        rotateY: [0, 180],
                                        transition: {
                                            delay: 0.1 * index,
                                            type: "spring",
                                            duration: 0.8,
                                        }
                                    }}
                                    key={index} className="flex max-w-[80px] items-center justify-center p-3 aspect-square ">
                                    <img className="h-full mix-blend-multiply" src={item} alt={`Logo ${index + 1}`} />
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
