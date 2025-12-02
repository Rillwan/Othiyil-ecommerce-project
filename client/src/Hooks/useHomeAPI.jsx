import axios from "axios";
import ApiURL from "./API/API";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setHomeData } from "../redux/homeSlice";

const useHomeAPI = () => {
    const dispatch = useDispatch();

    // PUBLIC - GET CATEGORY AND PRODUCTS
    const GetPublicHomeAPI = async () => {
        try {
            // API REQUEST
            await axios.get(`${ApiURL}/public/home`,
            ).then((res) => {
                if (res?.data?.success) {
                    dispatch(
                        setHomeData({
                            category: res?.data?.result?.category,
                            products: res?.data?.result?.products,
                            videos: res?.data?.result?.videos,
                            activeCategory: res?.data?.result?.activeCategory,
                        })
                    );
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

    // SUBMIT CONTACT FORM
    const SubmitContactForm = async ({ name, email, mobile, message }) => {
        try {
            if (!name || !email || !mobile || !message) {
                return;
            }
            const categoryForm = new FormData();
            categoryForm.append("name", name);
            categoryForm.append("email", email);
            categoryForm.append("mobile", mobile);
            categoryForm.append("message", message);
            // API REQUEST
            await axios.post(`${ApiURL}/public/submit-contact`,
                categoryForm,
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

    // DATE AND TIME FORMATTER 
    const FormateDateAndTime = (dateString) => {
        if (!dateString) {
            return "-------";
        }
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return (`${day}-${month}-${year}  ${hours}:${minutes}`);
    }


    return {
        GetPublicHomeAPI,
        SubmitContactForm,
        FormateDateAndTime
    }
}

export default useHomeAPI;