import { useSelector } from "react-redux";
import useCategoryAPI from "../../../Hooks/useCategoryAPI";
import AddCategory from "./AddCategory";
import SubCategory from "./SubCategory";
import useSingleEffect from './../../../Hooks/Custom/useSingleEffect';
import { IoReloadCircle } from "react-icons/io5";
import EditCategory from "./EditCategory";
import ApiURL from "../../../Hooks/API/API";

const Category = () => {
    const { token } = useSelector((state) => state.auth);
    const { Categories, GetCategoriesAPI, DeleteCategoryAPI } = useCategoryAPI();

    // GET CATEGORIES RENDER
    useSingleEffect(async () => {
        if (token) {
            await GetCategoriesAPI({ token: token });
        }
    })

    const FetchData = async () => {
        if (token) {
            await GetCategoriesAPI({ token: token });
        }
    }

    // RELOAD CATEGORIES
    const HandleReload = async (e) => {
        e.preventDefault();
        if (token) {
            e.target.classList.add('animate-spin', 'duration-500');
            setTimeout(() => {
                e.target.classList.remove('animate-spin', 'duration-500');
            }, 3000);
            await GetCategoriesAPI({ token: token });
        }
    }

    // Open Delete Dialog Category
    const OpenDeleteDialog = async ({ id }) => {
        if (window.confirm("Are you sure to delete this category?")) {
            await DeleteCategoryAPI({ id, token: token });
        } else {
            return;
        }
        await GetCategoriesAPI({ token: token });
    }

    // console.log(Categories);
    

    return (
        <div className="Category">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h1 className="section-header text-[1.3rem] font-semibold flex items-center gap-2">
                        Category <IoReloadCircle onClick={HandleReload} className="cursor-pointer transition-all text-[25px] text-blue-600" />
                    </h1>
                    <AddCategory FetchData={FetchData} />
                </div>
                <div className="mt-3 rounded-xl overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th scope="col" className="py-3 px-6 text-start ">Name</th>
                                <th scope="col" className="py-3 px-6 text-center ">Sub-Category</th>
                                <th scope="col" className="py-3 px-6 text-center ">Products</th>
                                <th scope="col" className="py-3 px-6 text-center ">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-100">
                            {
                                Categories?.map((item, i) => (
                                    <tr className="mx-4" key={i}>
                                        <td scope="row" className="py-2 px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <img className="rounded-md bg-gray-300 w-[40px] h-[40px] object-cover object-center"
                                                    src={`${ApiURL}/image/200/${item?.image}`} alt="" />
                                                <p className="">
                                                    {item?.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">{item?.subcategoryCount}</td>
                                        <td className="py-3 px-6 text-center">{item?.productCount || 0}</td>
                                        <td className="py-3 px-6 text-center flex gap-2 justify-center">
                                            <div>
                                                <SubCategory Item={item} />
                                            </div>
                                            <EditCategory FetchData={FetchData} Data={item} />
                                            <button onClick={() => OpenDeleteDialog({ id: item?._id })} className="px-4 py-1 bg-red-200 text-center text-red-700 rounded-lg">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Category
