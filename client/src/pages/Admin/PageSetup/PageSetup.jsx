import { useSelector } from "react-redux";
import useCategoryAPI from "../../../Hooks/useCategoryAPI";
import ApiURL from './../../../Hooks/API/API';
import useSingleEffect from './../../../Hooks/Custom/useSingleEffect';
import { AiFillDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

const PageSetup = () => {
    const { token } = useSelector((state) => state.auth);
    const { Categories, GetCategoriesAPI, UpdateActiveSubcategoryAPI, subcategories, GetSubCategoriesAPI } = useCategoryAPI();

    // GET CATEGORIES RENDER
    useSingleEffect(async () => {
        if (token) {
            await GetSubCategoriesAPI({ token: token });
        }
    })


    // Active Status Category
    const HandleActiveSubcategory = async (e, id) => {
        e.preventDefault();
        if (!token) {
            return
        }
        if (id) {
            await UpdateActiveSubcategoryAPI({ id, token, active: e.target.checked });
        }
        await GetSubCategoriesAPI({ token });
    };

    // console.log(subcategories);

    return (
        <div className="Dashboard">
            <h3 className="font-semibold text-2xl uppercase">Page Setup</h3>
            <div className="bg-gray-200 rounded-xl p-4 mt-3">
                <h4 className="font-semibold text-xl uppercase">Home Page</h4>
                {/* Banner Section  */}
                <div className="mt-2 relative">
                    <h5 className="font-semibold text-base">Banner Section - coming soon</h5>
                    <p className="text-[12px] text-gray-600 ">Please upload a landscape image for best banner quality.</p>
                    <div className="mt-3 md:mt-0 md:absolute top-1 right-2 text-white bg-green-700 py-2 px-3 rounded-md cursor-pointer flex gap-2 justify-center items-center text-[14px]">
                        <IoMdAdd className="text-[18px] " />New
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 mt-3 ">
                        {
                            [...Array(2)]?.map((item, index) => (
                                <div className="p-3 md:p-2 rounded-xl bg-white flex items-center justify-between relative" key={index}>
                                    <div className="flex gap-3 items-center flex-wrap md:flex-nowrap">
                                        <img
                                            // src={`${ApiURL}/image/200/${item?.image}`} 
                                            src="https://placehold.co/400"
                                            className="rounded-md aspect-video object-cover h-[100px] bg-gray-200 block" alt="image" />
                                        <div className="pr-2">
                                            <h3 className="font-medium text-[15px] leading-[1rem]">Lorem ipsum dolor sit amet consectetur adipisicing</h3>
                                            <p className="mt-1 text-[12px] text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit..</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 text-[25px] right-2 text-red-300 cursor-pointer"><AiFillDelete className="" /></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* Auto Playing Video Category Section  */}
                <div className=" mt-8">
                    <h5 className="font-semibold text-base">Auto Playing Video Category Section</h5>
                    <p className="text-[12px] text-gray-600 ">maximum 4 category only visible</p>
                    <div className="grid md:grid-cols-3 gap-2 mt-3 ">
                        {
                            subcategories?.map((item, index) => (
                                <div className="p-2 rounded-xl bg-white flex items-center justify-between" key={index}>
                                    <div className="flex gap-2 items-center">
                                        <img src={`${ApiURL}/image/200/${item?.image}`}
                                            className="rounded-md aspect-square object-cover w-[40px] bg-gray-200" alt="" />
                                        <div>
                                            <p className="text-sm">{item?.name}</p>
                                            <p className="text-[11px] text-gray-500">{item?.category?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {!item?.video ? (<span className="text-[10px] text-wrap text-red-400 ml-auto block text-end">No video uploaded</span>) :
                                            (<span className="text-[10px] text-wrap text-green-700 ml-auto block text-end">Video available</span>)}
                                        <input type="checkbox"
                                            checked={item?.active}
                                            onChange={(e) => HandleActiveSubcategory(e, item?._id)}
                                            className="w-[20px] h-[20px] mr-4 rounded-md" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageSetup
