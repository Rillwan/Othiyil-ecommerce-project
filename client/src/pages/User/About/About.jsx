import { TfiQuoteLeft, TfiQuoteRight } from "react-icons/tfi";
import { AboutData, HomeData } from './../Home/HomeData';
import Counter from '../../../components/Counter/Counter';
import { motion } from 'framer-motion';
import PartnerIMg from '../../../assets/images/partner.jpg'

const About = () => {
    return (
        <div className='AboutPage'>
            <div className='bg-gray-900 text-white'>
                <div className='h-[330px] grid items-center'>
                    <motion.div className="container"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: { delay: 0.3, duration: 0.4, ease: 'easeIn' }
                        }}
                    >
                        <h2 className='text-6xl mt-6 text-center font-light'>About Us</h2>
                        <p className='text-center mt-4 font-thin'>We are a leading furniture store offering a wide range of high-quality products.</p>
                    </motion.div>
                </div>
                <div className="container">
                    <div>
                        <h3 className='text-lg pb-8 font-light'>Home / <span className='opacity-40'>About Us</span></h3>
                    </div>
                </div>
            </div>
            {/* TEXT */}
            <div className="mt-1 md:mt-20">
                <div className="container">
                    <div className="grid xl:grid-cols-2 gap-10 md:gap-20 lg:gap-6">
                        <div className="lg:pr-16">
                            <h2 className="text-5xl font-medium mt-20">
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
                                    initial={{ y: -80, opacity: 0 }}
                                    whileInView={{
                                        y: 0,
                                        opacity: 1,
                                        transition: { delay: 0.2, duration: 0.6, ease: 'easeIn' }
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
                                    initial={{ y: +80, opacity: 0 }}
                                    whileInView={{
                                        y: 0,
                                        opacity: 1,
                                        transition: { delay: 0.2, duration: 0.6, ease: 'easeIn' }
                                    }}
                                    className="h-full object-center object-cover" src={AboutData?.banner2} alt="" />
                                <div className="w-full h-[1px] bg-black/50 mt-3"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* COUNT  */}
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
            {/* COMMENT  */}
            <div className="mt-20">
                <div className="container">
                    <div>
                        <h2 className="text-5xl font-light text-center">Message from Founder’s </h2>
                    </div>
                    <div
                        // className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-6'
                        className='mt-10'
                    >
                        {/* <div className='md:col-span-1'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{
                                    opacity: 1,
                                    transition: { delay: 0.1, duration: 0.4, ease: 'easeIn' }
                                }} 
                                className="">
                                <img className='aspect-auto object-cover p-4' src={PartnerIMg} alt="" />
                            </motion.div>
                        </div> */}
                        <div className='md:col-span-2'>
                            <div className='text-gray-600 text-[17px] sm:p-6 '>
                                <TfiQuoteLeft />
                                <p className='sm:px-5 mt-3 tracking-[1px] text-center'>
                                    The journey began in 1975 with a simple vision to build a business rooted in trust, hard work,
                                    and service to the community. Over the years, that vision has grown into a diverse group of enterprises
                                    spanning marble and building materials, interior fit-out, construction solutions, hospitality, healthcare,
                                    catering, and retail.
                                    Every venture has been guided by the same principle delivering quality with integrity and creating long
                                    term value for our customers, partners, and employees. From our earliest days to where we stand today,
                                    the goal has always been to contribute meaningfully,
                                    build lasting relationships, and leave a positive impact on every industry we serve.
                                    As we continue to expand and adapt to new opportunities, our core values remain unchanged. It gives me
                                    great pride to see the next generation carrying forward this
                                    legacy with the same passion and commitment that began this journey five decades ago.
                                </p>
                                <TfiQuoteRight className='float-right' />
                                <hr className='mt-8 border-gray-400 mx-auto w-1/2' />
                                <div className='mt-6 w-fit mx-auto text-center'>
                                    <p className='text-xl text-gray-700 font-light tracking-[-1px]'>N. V. Mohamed</p>
                                    <p className='text-gray-600 tracking-[2px] text-[12px]'>Founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
