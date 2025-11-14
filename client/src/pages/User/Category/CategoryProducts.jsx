import { useParams } from "react-router-dom";
import useProductAPI from "../../../Hooks/useProductAPI";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/Cards/ProductCard";

const CategoryProducts = () => {
    const [Page, setPage] = useState({
        page: 1,
        limit: 12,
    });
    const { name } = useParams(); // category id from URL
    const { Products, GetProductsByCategoryAPI, Total, setProducts, setTotal } = useProductAPI();

    // GET ATTRIBUTES RENDER
    useEffect(() => {
        // Clear previous products and total when category changes
        setProducts([]);
        setTotal(0);
        const FetchData = async (name) => {
            await GetProductsByCategoryAPI({ category: name, page: Page.page, limit: Page.limit });
        }
        FetchData(name);
    }, [name]);

    const LoadMoreProducts = async () => {
        setPage({ ...Page, page: Page.page += 1 });
        await GetProductsByCategoryAPI({ category: name, page: Page.page, limit: Page.limit });
    }

    return (
        <div className="CategoryProducts">
            <div className="container">
                <div>
                    <h4 className="text-base text-start mt-32 font-medium flex items-center gap-1">Category <MdOutlineKeyboardArrowRight /> {name} </h4>
                    <div className="mt-8">
                        <div className="grid gap-6  grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {
                                Products?.map((item, index) => (
                                    <div key={index}>
                                        <ProductCard data={item} i={index} />
                                    </div>
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

export default CategoryProducts
