import { useSelector } from "react-redux";
import ApiURL from "../../../Hooks/API/API"
import useSingleEffect from "../../../Hooks/Custom/useSingleEffect";
import useProductAPI from "../../../Hooks/useProductAPI";
import { Link } from "react-router-dom";
import { useState } from "react";

const TextLimit = ({ text, limit = 25 }) => {
    const truncatedText = text.length > limit
        ? text.substring(0, limit) + "..."
        : text;

    return <p>{truncatedText}</p>;
};

const ProductList = () => {
    const [Page, setPage] = useState({
        page: 1,
        limit: 20,
    });
    const { token } = useSelector((state) => state.auth);
    const { ProductList, GetProductListAPI, DeleteProductAPI } = useProductAPI();

    // GET ATTRIBUTES RENDER
    useSingleEffect(async () => {
        if (token) {
            await GetProductListAPI({ token: token, page: Page.page, limit: Page.limit });
        }
    });

    // DELETE PRODUCT HANDLER
    // Open Delete Dialog Category
    const OpenDeleteDialog = async ({ id }) => {
        if (window.confirm("Are you sure to delete this product?")) {
            await DeleteProductAPI({ id, token: token });
        } else {
            return;
        }
        await GetProductListAPI({ token: token });
    }

    // console.log(ProductList);
    

    return (
        <div className="ProductList p-4 rounded-xl">
            <div className="">
                <h3 className="font-semibold text-xl">Product List</h3>
                <div className="rounded-xl overflow-x-auto mt-3">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th scope="col" className="py-3 px-6 text-start ">Name</th>
                                <th scope="col" className="py-3 px-6 text-center ">Category</th>
                                <th scope="col" className="py-3 px-6 text-center ">SubCategory</th>
                                <th scope="col" className="py-3 px-6 text-center ">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-100">
                            {
                                ProductList?.Products?.map((item, i) => (
                                    <tr className="mx-4" key={i}>
                                        <td scope="row" className="py-2 px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <img className="rounded-md w-[40px] h-[40px] object-cover object-center"
                                                    src={`${ApiURL}/image/100/${item?.images[0]}`} alt="" />
                                                <div className="">
                                                    <TextLimit text={item?.name} limit={40} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">{item?.category?.name}</td>
                                        <td className="py-3 px-6 text-center">{item?.subcategory?.name}</td>
                                        <td className="py-3 px-6 text-center flex gap-2 justify-center">
                                            <Link to={`/my-admin/edit-product/${item?._id}`} className="px-4 py-1 bg-blue-700 text-center text-white rounded-lg">Edit</Link>
                                            <button onClick={() => OpenDeleteDialog({ id: item._id })} className="px-4 py-1 bg-red-200 text-center text-red-700 rounded-lg">Delete</button>
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

export default ProductList
