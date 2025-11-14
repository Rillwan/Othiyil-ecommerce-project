import { Link } from "react-router-dom";
import ApiURL from "../../../Hooks/API/API";
import useSingleEffect from "../../../Hooks/Custom/useSingleEffect";
import useProductAPI from "../../../Hooks/useProductAPI";
import { TextLimit } from './../../../components/Optimized/TextLimit';
import { useState } from "react";

const AllProducts = () => {
    const [Page, setPage] = useState({
        page: 1,
        limit: 12,
    });
    const { Products, GetProductsAPI, Total } = useProductAPI();

    // GET ATTRIBUTES RENDER
    useSingleEffect(async () => {
        await GetProductsAPI({ page: Page.page, limit: Page.limit });
    });

    const LoadMoreProducts = async () => {
        setPage({ ...Page, page: Page.page += 1 });
        await GetProductsAPI({ page: Page.page, limit: Page.limit });
    }
    return (
        <div className="AllProducts">
            <div className="container">
                <div>
                    <h2 className="text-3xl text-center mt-32 font-medium">Exclusive Collections</h2>
                    <div className="mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {
                                Products?.map((item, index) => (
                                    <Link to={`/product/${item?._id}`} className="bg-gray-100 p-6 w-full " key={index}>
                                        <div>
                                            <img className="w-full aspect-square object-cover bg-white" src={`${ApiURL}/image/400/${item?.images[0]}`} alt="" />
                                        </div>
                                        <div className="mt-4">
                                            <div className="text-base font-medium border-b pb-2">
                                                <TextLimit text={item?.name} limit={65} />
                                            </div>
                                            <div className="mt-2 flex justify-between items-center gap-4">
                                                <p className="text-sm text-gray-600 text-[12px]">{item?.category?.name}</p>
                                                <p className="font-medium">{item?.brand}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                        {
                            Products?.length !== Total && (
                                <div className="mt-10">
                                    <button onClick={LoadMoreProducts} className="btn w-fit block bg-black text-white px-6 py-2 mx-auto">Load More</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
