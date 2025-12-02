import { Link } from "react-router-dom"
import { GoArrowUpRight } from "react-icons/go";
import { useSelector } from 'react-redux';
import ApiURL from './../../Hooks/API/API';
import Logo from "../../assets/logo.png"
import CustomImage from "../SEO/CustomImage";

const Footer = () => {
    const { activeCategory } = useSelector((state) => state.home);

    return (
        <footer className="Footer mt-20">
            <div className="bg-gray-100 p-4 md:p-6">
                <div className="container">
                    <div className="pt-10 pb-20 border-b flex justify-between flex-wrap gap-8">
                        <div>
                            <h3 className="text-3xl">Let's</h3>
                            <h2 className="text-6xl md:text-8xl">Get in touch</h2>
                        </div>
                        <div className="grid items-end">
                            <Link to={'/'} className="bg-black text-white px-6 py-3 uppercase flex items-center gap-2">Contact Us <GoArrowUpRight /></Link>
                        </div>
                    </div>
                    <div className="py-10 mt-8 flex items-center flex-wrap lg:flex-nowrap gap-8 justify-between">
                        <div className="flex gap-10 flex-col sm:flex-row mx-auto lg:mx-0 text-center md:text-start justify-between max-w-[300px] w-full">
                            <div>
                                <h4 className="font-semibold uppercase text-lg md:text-base">Quick Links</h4>
                                <ul className="grid gap-3 mt-3 text-[16px] lg:text-[14px]">
                                    <li><Link to={'/'} className="text-gray-600">Home</Link></li>
                                    <li><Link to={'/contact'} className="text-gray-600">Contact</Link></li>
                                    <li><Link to={'/about'} className="text-gray-600">About Us</Link></li>
                                    {/* <li><Link to={'/'} className="text-gray-600">Blog</Link></li> */}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold uppercase text-lg md:text-base">Connect</h4>
                                <ul className="grid gap-3 mt-3 text-[16px] lg:text-[14px]">
                                    <li><a href="https://wa.me/+919656337712" target="_blank" rel="noopener noreferrer" className="text-gray-600">WhatsApp</a></li>
                                    <li><a href="tel:+919656337712" target="_blank" rel="noopener noreferrer" className="text-gray-600">Call</a></li>
                                    <li><a href="https://www.instagram.com/othiyilbuildingmaterials#/" target="_blank" rel="noopener noreferrer" className="text-gray-600">Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-fit mx-auto lg:mx-0">
                            {/* <p className="uppercase font-semibold">STAY UPDATED</p>
                            <div className="mt-2 p-[3px] w-fit bg-white flex">
                                <input type="email" placeholder="Email Address..." className="px-4 text-[14px] w-full" />
                                <button className="bg-black text-white px-4 py-2">Subscribe</button>
                            </div>
                            <p className="text-[12px] text-gray-600 mt-2">
                                Subscribe to our newsletter for the latest updates.
                            </p> */}
                            <div className="flex flex-wrap items-center justify-center w-[280px] gap-2">
                                {
                                    activeCategory?.slice(0, 9).map((item, i) => (
                                        <Link to={`/category/${item.slug}`} key={i} className="aspect-square w-[88px]">
                                            <CustomImage className="p-3 cursor-pointer hover:scale-105 transition-all border-gray-300 border aspect-square object-cover object-center w-[100%]"
                                                src={`${ApiURL}/image/200/${item?.image}`} width={200} height={200} alt={`${item?.name}`} title={`${item?.name}`}
                                            />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 p-4 flex flex-wrap flex-col md:flex-row gap-14 gap-y-5 justify-center md:justify-between items-center">
                        <div className="flex gap-8 gap-y-4 flex-wrap justify-center flex-col md:flex-row">
                            <div className="grid items-center gap-3 justify-center" >
                                <CustomImage className="bg-black p-3 rounded-xl w-[100px]" width={200} height={200} src={Logo} alt="Othiyil logo" title="othiyil logo" />
                                <h3 className="font-semibold text-3xl tracking-wide text-center">Othiyil</h3>
                            </div>
                            <div className="text-center md:text-start">
                                <p className="text-[13px] text-gray-700 pt-2">Address</p>
                                <p className="text-[15px] ">Othiyil Building Materials LLP, <br />Kalanagara, Mokeri, Kuttiyadi, <br />India, Kerala</p>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex gap-2 text-[14px]">
                                <h5 className="font-semibold">Email : </h5>
                                <a href="mailto:Obm.llp@gmail.com" target="_blank" rel="noopener noreferrer">Obm.llp@gmail.com</a>
                            </div>
                            <div className="flex gap-2 text-[14px]">
                                <h5 className="font-semibold">Phone : </h5>
                                <a className="block font-medium tracking-[1px]" href="tel:+919656337712" target="_blank" rel="noopener noreferrer">+91 9656337712</a>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="flex justify-between items-center flex-wrap gap-y-4 text-center md:text-start py-4 ">
                    {/* <p className="text-sm text-gray-600 w-full md:w-fit order-1 md:order-none">© 2025 Your Company. All rights reserved.</p> */}
                    <div className="flex gap-4 flex-wrap w-full md:w-fit">
                        <Link to={'/'} className="text-sm text-gray-600 w-full md:w-fit">Privacy Policy</Link>
                        <Link to={'/'} className="text-sm text-gray-600 w-full md:w-fit">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
