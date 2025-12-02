import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom"
import { logout } from "../../../redux/authSlice";
import { RiMenu2Line } from "react-icons/ri";
import { useState } from "react";

const AdminLayout = () => {
    const [MenuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const LogoOut = () => {
        dispatch(logout());
    }
    return (
        <div className="AdminLayout">
            <div className=" bg-gray-900 p-3 xl:hidden">
                <RiMenu2Line onClick={() => setMenuOpen(!MenuOpen)} className="text-[40px] rounded-full p-2 bg-gray-100 " />
            </div>
            <div className="flex">
                {/* MENU  */}
                <div className="w-fit xl:w-[15%] min-h-screen relative">
                    <div className={`absolute left-0 w-[250px] lg:w-full top-0 h-full z-50 transform transition-transform duration-300 xl:relative xl:translate-x-0 ${MenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="p-4 bg-gray-200 h-full">
                            <div className="mt-10">
                                <img className="mx-auto p-2 w-[80px] h-[80px] rounded-full bg-white overflow-hidden"
                                    src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="" />
                            </div>
                            <div className="mt-6">
                                <ul className="grid gap-2">
                                    <li>
                                        <Link to={'/my-admin'} onClick={() => setMenuOpen(false)} className="py-3 block w-full text-center rounded-xl bg-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/message'} onClick={() => setMenuOpen(false)} className="py-3 block w-full text-center rounded-xl bg-white">Message</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/product-list'} onClick={() => setMenuOpen(false)} className="py-3 block w-full text-center rounded-xl bg-white">Product List</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/add-product'} className="py-3 block w-full text-center rounded-xl bg-white">Add Product</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/category'} onClick={() => setMenuOpen(false)}
                                            className="py-3 block w-full text-center rounded-xl bg-white">
                                            Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/page-setup'} onClick={() => setMenuOpen(false)} className="py-3 block w-full text-center rounded-xl bg-white">Page Setup</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/reels'} onClick={() => setMenuOpen(false)} className="py-3 block w-full text-center rounded-xl bg-white">Reels</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin/account'} onClick={() => setMenuOpen(false)} className="py-3 block w-full text-center rounded-xl bg-white">Account</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-admin'} onClick={LogoOut} className="py-3 block w-full text-center rounded-xl bg-white">Log Out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-[85%] min-h-screen p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
