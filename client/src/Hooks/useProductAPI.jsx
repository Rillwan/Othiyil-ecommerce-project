import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import ApiURL from "./API/API";
import { useNavigate } from "react-router-dom";

const useProductAPI = () => {
    const [Progress, setProgress] = useState({
        upload: false,
        value: 0,
    });
    const [Attributes, setAttributes] = useState({
        categories: [],
    })
    const [ProductList, setProductList] = useState({
        Products: [],
    })
    const [Product, setProduct] = useState([]);
    const [Products, setProducts] = useState([]);
    const [Total, setTotal] = useState(0);
    const [ProductDetails, setProductDetails] = useState({
        name: '',
        description: '',
        category: '',
        subcategory: [],
        brand: '',
        measurement: '',
        color: '',
        images: [],
    });
    const navigate = useNavigate();

    // ---------- PUBLIC ----------------
    // GET PRODUCTS
    const GetProductsAPI = async ({ page, limit }) => {
        try {
            // API REQUEST
            await axios.get(`${ApiURL}/v1/product`,
                // Query
                {
                    params: {
                        // Query parameters
                        page: page || 1,
                        limit: limit || 10,
                    }
                }
            ).then((res) => {
                if (res?.data?.success) {
                    if (res.data?.result?.length > 0) {
                        setProducts((prev) => [...prev, ...res.data.result]);
                        setTotal(res?.data?.total)
                    }
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // GET PRODUCT BY ID 
    const GetProductByIdAPI = async ({ pid }) => {
        try {
            if (!pid) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/product/${pid}`).then((res) => {
                if (res?.data?.success) {
                    setProduct(res?.data?.result);
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // GET PRODUCTS BY CATEGORY
    const GetProductsByCategoryAPI = async ({ page, limit, category }) => {
        try {
            if (!category) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/public/category/${category}`,
                // Query
                {
                    params: {
                        // Query parameters
                        page: page || 1,
                        limit: limit || 10,
                    }
                }
            ).then((res) => {
                if (res?.data?.success) {
                    if (res.data?.result?.length > 0) {
                        // setProducts((prev) => [...prev, ...res.data.result]);
                        setTotal(res?.data?.total)
                        // prevent duplicates
                        setProducts(prev => {
                            const map = new Map(prev.map(item => [item._id, item]));
                            res.data.result.forEach(item => {
                                if (!map.has(item._id)) map.set(item._id, item);
                            });
                            return Array.from(map.values());
                        });
                    }
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // ---------- ADMIN ----------------
    // ADMIN CREATE PRODUCT
    const CreateProductAPI = async ({ product, token }) => {
        setProgress({
            upload: true,
            value: 0,
        })
        try {
            if (!product.images.length > 0) {
                toast.error("Please add at least one image");
                return;
            } else if (!product.category) {
                toast.error("Please select a category");
                return;
            }
            if (!product.name && token) {
                return;
            }
            const ProductData = new FormData();
            ProductData.append("name", product?.name);
            ProductData.append("description", product?.description);
            ProductData.append("brand", product?.brand);
            ProductData.append("category", product?.category);
            ProductData.append("subCategory", JSON.stringify(product?.subCategory?.map((sub) => sub?.value)));
            ProductData.append("measurement", product?.measurement);
            ProductData.append("color", product?.color);
            // images
            product?.images.forEach((image) => {
                ProductData.append('images', image);
            })
            await axios.post(`${ApiURL}/v1/product/admin/create-product`, ProductData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                onUploadProgress: (progressEvent) => {
                    // Calculate upload percentage
                    const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress({
                        upload: true,
                        value: percentComplete,
                    });
                },
            }).then((res) => {
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                }
            }).catch((err) => {
                console.log(err);

                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
        setProgress({
            upload: false,
            value: 0,
        })
    }

    // ADMIN UPDATE PRODUCT
    const UpdateProductAPI = async ({ product, token, id }) => {
        setProgress({
            upload: true,
            value: 0,
        })
        try {
            if (!product?.name?.length > 0) {
                toast.error("Name missing");
                return;
            }
            else if (!id) {
                toast.error("Product Missing");
                return;
            }
            if (!product.name || !token) {
                return;
            }
            const ProductData = new FormData();
            ProductData.append("name", product?.name);
            ProductData.append("description", product?.description);
            ProductData.append("brand", product?.brand);
            ProductData.append("measurement", product?.measurement);
            ProductData.append("color", product?.color);
            // images
            // product?.images.forEach((image) => {
            //     ProductData.append('images', image);
            // })
            await axios.put(`${ApiURL}/v1/product/admin/update-product/${id}`, ProductData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                onUploadProgress: (progressEvent) => {
                    // Calculate upload percentage
                    const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress({
                        upload: true,
                        value: percentComplete,
                    });
                },
            }).then((res) => {
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    navigate('/my-admin/product-list');
                }
            }).catch((err) => {
                // console.log(err);
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
        setProgress({
            upload: false,
            value: 0,
        })
    }

    // ADMIN - GET PRODUCT ATTRIBUTES
    const GetProductAttributesAPI = async ({ token }) => {
        try {
            if (!token) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/product/admin/get-product-attributes`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            ).then((res) => {
                if (res?.data?.success) {
                    setAttributes({
                        categories: res?.data?.result,
                    });
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // ADMIN PRODUCT LIST
    const GetProductListAPI = async ({ token, page, limit }) => {
        try {
            if (!token) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/product/admin/list`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        // Query parameters
                        page: page || 1,
                        limit: limit || 10,
                    }
                },
            ).then((res) => {
                if (res?.data?.success) {
                    setProductList({ ...ProductList, Products: res?.data?.result?.products });
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // ADMIN - DELETE PRODUCT
    const DeleteProductAPI = async ({ id, token }) => {
        try {
            if (!id || !token) {
                return;
            }
            // API REQUEST
            await axios.delete(`${ApiURL}/v1/product/admin/delete/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            ).then((res) => {
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // ADMIN - GET PRODUCT BY ID 
    const AdminProductByIdAPI = async ({ pid, token }) => {
        try {
            if (!pid || !token) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/product/admin/${pid}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            ).then((res) => {
                if (res?.data?.success) {
                    setProductDetails(res?.data?.result);
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return {
        CreateProductAPI, Progress,
        Attributes,
        GetProductAttributesAPI,
        GetProductListAPI, ProductList,
        GetProductByIdAPI, Product,
        GetProductsAPI, Products,
        GetProductsByCategoryAPI, Total, setProducts, setTotal,
        DeleteProductAPI,
        UpdateProductAPI,
        AdminProductByIdAPI, ProductDetails, setProductDetails,
    }
}

export default useProductAPI;