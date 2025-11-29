import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import ApiURL from './API/API';

const useCategoryAPI = () => {
    const [Categories, setCategories] = useState([]);
    const [SubCategoryName, setSubCategoryName] = useState('');
    const [Progress, setProgress] = useState({
        upload: false,
        value: 0,
    });

    // ADMIN - CREATE CATEGORY
    const CreateCategoryAPI = async ({ category, image, token }) => {
        try {
            if (!category || !token) {
                return;
            }
            const categoryForm = new FormData();
            categoryForm.append('category', category);
            categoryForm.append('image', image);
            // API REQUEST
            await axios.post(`${ApiURL}/v1/category/create`,
                categoryForm,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
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

    // ADMIN - GET CATEGORIES
    const GetCategoriesAPI = async ({ token }) => {
        try {
            if (!token) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/category/admin/categories`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            ).then((res) => {
                if (res?.data?.success) {
                    setCategories(res?.data?.result);
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

    // ADMIN - UPDATE ACTIVE CATEGORY 
    const UpdateActiveCategoryAPI = async ({ id, token, active }) => {
        try {
            if (!id && !token && active) {
                return;
            }
            const Form = new FormData();
            Form.append('active', active);
            // API REQUEST
            await axios.put(`${ApiURL}/v1/category/active/${id}`,
                Form,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
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

    // ADMIN - CREATE SUB-CATEGORY
    const CreateSubCategoryAPI = async ({ categoryId, token, Image, name, description }) => {
        try {
            if (!name || !categoryId || !token) {
                return;
            }
            const categoryForm = new FormData();
            categoryForm.append('name', name);
            categoryForm.append('description', description);
            categoryForm.append('image', Image);
            // categoryForm.append('image', image);
            // API REQUEST
            await axios.post(`${ApiURL}/v1/category/create-subcategory/${categoryId}`,
                categoryForm,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
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

    // ADMIN - DELETE CATEGORY
    const DeleteCategoryAPI = async ({ id, token }) => {
        try {
            if (!id || !token) {
                return;
            }
            // API REQUEST
            await axios.delete(`${ApiURL}/v1/category/delete/${id}`,
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

    // ADMIN - DELETE SUB-CATEGORY
    const DeleteSubCategoryAPI = async ({ id, token }) => {
        try {
            if (!id || !token) {
                return;
            }
            // API REQUEST
            await axios.delete(`${ApiURL}/v1/category/delete/sub-category/${id}`,
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

    // ADMIN - UPDATE CATEGORY
    const UpdateCategoryAPI = async ({ id, category, image, token }) => {
        try {
            if (!id || !category || !token) {
                return;
            }
            const categoryForm = new FormData();
            categoryForm.append('category', category);
            categoryForm.append('image', image);
            // API REQUEST
            await axios.put(`${ApiURL}/v1/category/update/${id}`,
                categoryForm,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
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

    // ADMIN - UPLOAD VIDEO FILE IN SUB-CATEGORY
    const UploadVideoAPI = async ({ video, token, id }) => {
        setProgress({
            upload: true,
            value: 0,
        })
        try {
            if (!video || !token || !id) {
                return;
            }
            const categoryForm = new FormData();
            categoryForm.append('video', video);
            // API REQUEST
            await axios.put(`${ApiURL}/v1/category/admin/subcategory/upload-video/${id}`,
                categoryForm,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        // Calculate upload percentage
                        const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress({
                            upload: true,
                            value: percentComplete,
                        });
                    },
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
        setProgress({
            upload: false,
            value: 0,
        })
    }

    // ADMIN - GET SUB-CATEGORY NAME
    const GetSubCategoryNameAPI = async ({ token, id }) => {
        try {
            if (!token || !id) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/category/admin/subcategory/name/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            ).then((res) => {
                if (res?.data?.success) {
                    setSubCategoryName(res?.data?.result);
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

    // ADMIN - DELETE VIDEO FROM SUB-CATEGORY
    const DeleteVideoAPI = async ({ token, id }) => {
        try {
            if (!id || !token) {
                return;
            }
            // API REQUEST
            await axios.delete(`${ApiURL}/v1/category/delete-video-by-subcategory/${id}`,
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

    return {
        CreateCategoryAPI,
        Categories, setCategories,
        GetCategoriesAPI,
        CreateSubCategoryAPI,
        DeleteCategoryAPI,
        DeleteSubCategoryAPI,
        UpdateCategoryAPI,
        UpdateActiveCategoryAPI,
        UploadVideoAPI,
        SubCategoryName,
        GetSubCategoryNameAPI, Progress,
        DeleteVideoAPI,
    }
}

export default useCategoryAPI;