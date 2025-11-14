import { useSelector } from "react-redux";
import useCategoryAPI from "../../../Hooks/useCategoryAPI";
import ApiURL from './../../../Hooks/API/API';
import useSingleEffect from './../../../Hooks/Custom/useSingleEffect';

const PageSetup = () => {
    const { token } = useSelector((state) => state.auth);
    const { Categories, GetCategoriesAPI, UpdateActiveCategoryAPI } = useCategoryAPI();

    // GET CATEGORIES RENDER
    useSingleEffect(async () => {
        if (token) {
            await GetCategoriesAPI({ token: token });
        }
    })


    // Active Status Category
    const HandleActiveCategory = async (e, id) => {
        e.preventDefault();
        if (!token) {
            return
        }
        if (id) {
            await UpdateActiveCategoryAPI({ id, token, active: e.target.checked });
        }
        await GetCategoriesAPI({ token });
    };

    // console.log(Categories);
    
    return (
        <div className="Dashboard">
            <h3 className="font-semibold text-2xl uppercase">Page Setup</h3>
            <div className="bg-gray-200 rounded-xl p-4 mt-3">
                <h4 className="font-semibold text-xl uppercase">Home Page</h4>
                <div className=" mt-2">
                    <h5 className="font-semibold text-base">Auto Playing Video Category Section</h5>
                    <p className="text-[12px] text-gray-600 ">maximum 4 category only visible</p>
                    <div className="grid md:grid-cols-3 gap-2 mt-3 ">
                        {
                            Categories?.map((item, index) => (
                                <div className="p-2 rounded-xl bg-white flex items-center justify-between" key={index}>
                                    <div className="flex gap-2 items-center">
                                        <img src={`${ApiURL}/image/200/${item?.image}`}
                                            className="rounded-md aspect-square object-cover w-[40px] bg-gray-200" alt="" />
                                        <p className="text-sm">{item?.name}</p>
                                    </div>
                                    <input type="checkbox"
                                        checked={item?.active}
                                        onChange={(e) => HandleActiveCategory(e, item?._id)}
                                        className="w-[20px] h-[20px] mr-4 rounded-md" />
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
