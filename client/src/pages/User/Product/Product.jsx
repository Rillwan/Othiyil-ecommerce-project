import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSingleEffect from "../../../Hooks/Custom/useSingleEffect";
import useProductAPI from "../../../Hooks/useProductAPI";
import ApiURL from "../../../Hooks/API/API";

const Product = () => {
    const params = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const navigate = useNavigate();
    const { GetProductByIdAPI, Product } = useProductAPI();
    let count = 0

    // GET ATTRIBUTES RENDER
    useSingleEffect(async () => {
        if (params?.pid) {
            
            await GetProductByIdAPI({ pid: params?.pid });
        }
    });

    // TOGGLE IMAGE
    const HandleImageClick = (img, i) => {
        setSelectedImage(img);
        setActiveImg(i) // active preview 
    };

    // AUTO PLAY
    const HandleAutoplay = () => {
        if (Product?.images?.length > 0) {
            setSelectedImage(Product?.images[0]);
            // e.target.className = 'bi bi-pause'

            const interval = setInterval(() => {
                if (Product.images.length > count) {
                    setSelectedImage(Product.images[count])
                    setActiveImg(count)
                    count = count + 1
                }
                if (Product.images.length === count) {
                    // e.target.className = 'bi bi-play'
                    count = 0
                    clearInterval(interval);
                }
            }, 1250);
        } else {
            return
        }
    };

    return (
        <div className="Product-page">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-32">
                    <div className="gallery sm:p-8 md:p-10 lg:p-0 xl:p-10">
                        <div className="main-img">
                            {
                                Product?.images?.length > 0 && (
                                    <img className="w-full rounded-3xl transition-all aspect-square bg-gray-200" src={`${ApiURL}/image/750/${selectedImage === null ? Product?.images[0] : selectedImage}`} alt="" />
                                )
                            }
                            <div className="auto-play">
                                <i className="bi bi-play" onClick={(e) => HandleAutoplay(e)}></i>
                            </div>
                            <div className="back-btn">
                                <i className="bi bi-chevron-left" onClick={() => navigate(-1)}></i>
                            </div>
                        </div>
                        <div className="preview-imgs grid grid-cols-4 gap-2.5 items-center  mt-2">
                            {
                                Product?.images?.map((img, i) => (
                                    <div key={i} className={`preview-item overflow-hidden rounded-2xl hover:scale-[1.05] transition-all cursor-pointer p-1 ${activeImg === i ? 'active opacity-70' : ''}`} onClick={() => HandleImageClick(img, i)}>
                                        <img className="rounded-xl aspect-square object-cover w-full" src={`${ApiURL}/image/200/${img}`} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-4 xl:pt-10">
                        <div>
                            <p className="font-semibold text-gray-500">{Product?.brand}</p>
                            <h3 className="mt-2 text-2xl">{Product?.name}</h3>
                            <p className="mt-3 text-gray-600" style={{ whiteSpace: "pre-line" }}>
                                {
                                    Product?.description
                                }
                            </p>
                            <div className="grid grid-cols-2 mt-6">
                                <div className="">
                                    <p className="text-gray-500 font-medium text-[14px]">Category:</p>
                                    <p className="font-medium mt-2">{Product?.category?.name}</p>
                                </div>
                                <div className="">
                                    <p className="text-gray-500 font-medium text-[14px]">Brand:</p>
                                    <p className="font-medium mt-2">{Product?.brand}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 mt-6">
                                <div className="">
                                    <p className="text-gray-500 font-medium text-[14px]">Color:</p>
                                    <p className="font-medium mt-2">{Product?.color}</p>
                                </div>
                                <div className="">
                                    <p className="text-gray-500 font-medium text-[14px]">Product Type:</p>
                                    <div className="font-medium mt-2 text-[14px]">
                                        {
                                            Product?.subcategory?.map((type, index) => (
                                                <span key={index}>{type?.name}{Product?.subcategory?.length - 1 !== index ? ', ' : ''}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 mt-6">
                                <div className="">
                                    <p className="text-gray-500 font-medium text-[14px]">Measurement:</p>
                                    <p className="font-medium mt-2">{Product?.measurement}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
