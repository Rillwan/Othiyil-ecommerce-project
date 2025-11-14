import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom"
import { logout } from "../../../redux/authSlice";

const AdminLayout = () => {
    const dispatch = useDispatch();
    const LogoOut = () => {
        dispatch(logout());
    }
    return (
        <div className="AdminLayout">
            <div className="flex">
                {/* MENU  */}
                <div className="sm:w-[30%] md:w-[30%] lg:w-[20%] min-h-screen">
                    <div className="p-4 bg-gray-200 h-full">
                        <div className="mt-10">
                            <img className="mx-auto p-2 w-[80px] h-[80px] rounded-full bg-white overflow-hidden"
                                src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" alt="" />
                        </div>
                        <div className="mt-6">
                            <ul className="grid gap-2">
                                <li>
                                    <Link to={'/my-admin'} className="py-3 block w-full text-center rounded-xl bg-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin/message'} className="py-3 block w-full text-center rounded-xl bg-white">Message</Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin/product-list'} className="py-3 block w-full text-center rounded-xl bg-white">Product List</Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin/add-product'} className="py-3 block w-full text-center rounded-xl bg-white">Add Product</Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin/category'}
                                        className="py-3 block w-full text-center rounded-xl bg-white">
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin/page-setup'} className="py-3 block w-full text-center rounded-xl bg-white">Page Setup</Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin/account'} className="py-3 block w-full text-center rounded-xl bg-white">Account</Link>
                                </li>
                                <li>
                                    <Link to={'/my-admin'} onClick={LogoOut} className="py-3 block w-full text-center rounded-xl bg-white">Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sm:w-[70%] lg:w-[80%] min-h-screen p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
