import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { FaAngleDown } from "react-icons/fa6";
import './Layout.css'
import { useSelector } from 'react-redux';
import ApiURL from "../../Hooks/API/API";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import LogoImg from "../../assets/bannerLogo.jpg"

const MobileMenuBar = ({ category, setActiveCategory, activeCategory, HandleToggle }) => {
    return (
        <div>
            <Popover className="relative w-full">
                {/* Header Button */}
                <Popover.Button as="div" className="py-2 cursor-pointer flex items-center gap-2">
                    Shop
                    <FaAngleDown />
                </Popover.Button>

                {/* Dropdown Panel */}
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="pl-2 text-gray-800 w-full xs:absolute left-0 z-50 top-full xs:bg-gray-100 xs:rounded-2xl xs:p-2 xs:w-[280px]">
                        {category?.map((cat, i) => (
                            <div key={i} className=""
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === cat._id ? null : cat._id
                                    )
                                }
                            >
                                <div className="flex mt-1 items-center gap-2 py-2 px-4 w-full text-start rounded-xl transition-all hover:bg-white hover:shadow-sm">
                                    {/* <img className="w-[35px] aspect-square bg-white object-cover rounded-lg"
                                        src={`${ApiURL}/image/100/${cat?.image}`} alt="image" /> */}
                                    <div className="overflow-hidden">
                                        <p>{cat?.name}</p>
                                        {/* <p className="text-[12px] text-gray-600 text-nowrap">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem aut nemo aliquid quidem earum incidunt voluptatum dolorum, distinctio amet enim!</p> */}
                                    </div>
                                    <div className="ml-2">
                                        <FaAngleDown />
                                    </div>
                                </div>

                                {/* Subcategories */}
                                {activeCategory === cat._id && (
                                    <div className="transition-all pl-6">
                                        {cat?.SubCategories?.map((sub, index) => (
                                            <Link key={index} onClick={HandleToggle} to={`/category/${sub?.slug}`}
                                                className="flex mt-1 items-center gap-2 py-2 px-4 rounded-xl transition-all hover:bg-white hover:shadow-sm">
                                                <img className="w-[35px] aspect-square bg-white object-cover rounded-lg" src={`${ApiURL}/image/100/${sub?.image}`} alt="img" />
                                                {sub?.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    )
}

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [toggleCategory, setToggleCategory] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const { category } = useSelector((state) => state.home);

    const HandleToggle = () => {
        setToggleCategory(false)
        setToggle(false)
    }

    return (
        <div className="Header">
            <div className="bg-gray-100 shadow-lg text-black rounded-4xl md:rounded-[5rem] fixed z-[99] w-[calc(100%-2rem)] top-[1rem] left-1/2 translate-x-[-50%] transition-all">
                {/* DESKTOP */}
                <div className="hidden md:block">
                    <div className="flex justify-between items-center p-2 min-h-[66px] relative">
                        <Link to={'/'} className="flex items-center">
                            <img className="w-[50px] h-[50px] object-center object-cover p-[3px] bg-black rounded-full" src={LogoImg} alt="" />
                            <h1 className="ml-2 font-semibold text-[20px] tracking-[1px]">
                                Othiyil
                            </h1> 
                        </Link>
                        {/* MENU */}
                        <div className="">
                            <ul className="flex items-center gap-10 font-medium" >
                                <li >
                                    <NavLink to={'/'} className="py-2 custom-underline-effect" onClick={() => setToggleCategory(false)}>Home</NavLink>
                                </li>
                                <li>
                                    <div className="group/dropdown">
                                        <div className={`py-2 cursor-pointer flex items-center gap-2`} onClick={() => setToggleCategory(!toggleCategory)}>
                                            Products
                                            <FaAngleDown />
                                        </div>
                                        <div
                                            className={`dropdown-content absolute top-full bg-gray-100 transition-all shadow-lg rounded-b-2xl w-[270px] text-start grid gap-1 overflow-hidden h-0 ${toggleCategory ? `h-auto p-3` : 'h-0'}`}>
                                            {
                                                category?.map((item, i) => (
                                                    <div key={i} className="relative group" style={{ '--subcategory-height': `${(item?.SubCategories?.length || 0) * 59 + 4}px` }}>
                                                        <div className="flex items-center gap-2 py-3 px-5 w-full text-start rounded-xl transition-all hover:bg-white hover:shadow-sm">
                                                            {/* <img className="w-[35px] aspect-square bg-white object-cover rounded-lg"
                                                                src={`${ApiURL}/image/100/${item?.image}`} alt="image" /> */}
                                                            <div className="">
                                                                <p>{item?.name}</p>
                                                                {/* <p className="text-[12px] text-gray-600 text-nowrap overflow-hidden w-[170px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem aut nemo aliquid quidem earum incidunt voluptatum dolorum, distinctio amet enim!</p> */}
                                                            </div>
                                                        </div>
                                                        <div className={`bg-gray-100 px-3 transition-all h-0 overflow-hidden group-hover:mt-1 group-hover:h-[var(--subcategory-height)] group-hover:py-1 grid gap-1`}>
                                                            {
                                                                item?.SubCategories?.map((sub, index) => (
                                                                    <NavLink key={index} to={`/category/${sub?.slug}`} onClick={() => setToggleCategory(!toggleCategory)}
                                                                        className="flex items-center gap-2 py-2 px-4 rounded-xl transition-all hover:bg-white hover:shadow-sm">
                                                                        <img className="w-[35px] aspect-square bg-white object-cover rounded-lg" src={`${ApiURL}/image/100/${sub?.image}`} alt="img" />
                                                                        {sub?.name}
                                                                    </NavLink>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <NavLink to={'/about'} className="py-2 custom-underline-effect" onClick={() => setToggleCategory(false)}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/contact'} className="py-2 custom-underline-effect" onClick={() => setToggleCategory(false)}>Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="h-[-webkit-fill-available]">
                            <Link to={'/contact'} className="px-6 py-2 flex items-center justify-center bg-black text-white rounded-3xl h-full">Get in touch</Link>
                        </div>
                    </div>
                </div>
                {/* MOBILE */}
                <div className="block md:hidden">
                    <div className="flex justify-between relative items-center p-2">
                        <div className="flex items-center gap-3">
                            {/* TOGGLE BUTTON  */}
                            <div className={`toggle-btn ${toggle ? 'active' : ''}`}>
                                <button className="relative group" onClick={() => setToggle(!toggle)}>
                                    <div className={`${toggle ? 'ring-4' : ''} relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-black ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-md`}>
                                        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                                            <div className={`${toggle ? 'rotate-[42deg]' : ''} bg-white h-[2px] w-7 transform transition-all duration-300 origin-left`} />
                                            <div className={`${toggle ? '-translate-x-10' : ''} line-center bg-white h-[2px] w-1/2 rounded transform transition-all duration-300`} />
                                            <div className={`${toggle ? '-rotate-[42deg]' : ''} line-bottom bg-white h-[2px] w-7 transform transition-all duration-300 origin-left`} />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="">
                                <Link to={'/'} className="font-semibold block">
                                    Othiyil
                                </Link>
                            </div>
                        </div>
                        <div className="h-[-webkit-fill-available]">
                            <Link to={'/contact'} className="flex items-center justify-center px-6 py-2 bg-black text-white rounded-3xl h-full">Get in touch</Link>
                        </div>
                    </div>
                    {/* MENU */}
                    <div className={`custom-transition ${toggle ? 'block p-4 pt-0 h-auto' : 'h-0 overflow-hidden p-0'}`}>
                        <div className="overflow-y-scroll xs:overflow-visible max-h-[80vh]">
                            <ul className="flex flex-col xs:flex-row xs:justify-evenly items-start w-full px-4 xs:p-0 xs:items-center gap-3 font-medium" >
                                <li >
                                    <NavLink to={'/'} className="py-2 block custom-underline-effect" onClick={HandleToggle}>Home</NavLink>
                                </li>
                                <li className="block w-full xs:w-fit">
                                    <div>
                                        <MobileMenuBar HandleToggle={HandleToggle} category={category} setActiveCategory={setActiveCategory} activeCategory={activeCategory} />
                                    </div>
                                </li>
                                <li>
                                    <NavLink to={'/about'} className="py-2 block custom-underline-effect" onClick={HandleToggle}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/contact'} className="py-2 block custom-underline-effect" onClick={HandleToggle}>Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={` fixed to-0 left-0 w-full h-full z-10 ${toggleCategory ? 'hidden md:block' : 'hidden'}`}
                onClick={() => setToggleCategory(false)}></div>
        </div>
    )
}

export default Header
