import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, setCredentials } from "../redux/authSlice";
// import { useState } from "react";
// import { SetCart } from "../Redux/cartSlice";
import ApiURL from './API/API';

export const useAuthAPI = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // ============== ADMIN AUTHENTICATION ==============
    // ADMIN LOGIN
    const LoginAdminAPI = async (admin) => {
        try {
            if (!admin?.email && !admin?.password) {
                toast.error("Please fill all fields");
                return;
            }
            // Create Form
            const UserForm = new FormData();
            UserForm.append('email', admin.email);
            UserForm.append('password', admin.password);
            // API
            await axios.post(`${ApiURL}/v1/auth/admin/login`, UserForm,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            ).then((res) => {
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    dispatch(setCredentials({ token: res?.data?.token, admin: res?.data?.admin })); // REDUX STORE
                    navigate('/my-admin');
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // ADMIN REGISTER
    const RegisterAdminAPI = async (admin) => {
        try {
            if (!admin.email || !admin.password || !admin.name) {
                toast.error("Please fill all fields");
                return;
            }
            // Create Form
            const AdminForm = new FormData();
            AdminForm.append('email', admin.email);
            AdminForm.append('password', admin.password);
            AdminForm.append('name', admin.name);
            // API
            await axios.post(`${ApiURL}/v1/auth/admin/register`, AdminForm,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            ).then((res) => {
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    navigate('/admin-login');
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error(err?.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // ADMIN TOKEN VALIDATION
    const ValidateAdminTokenAPI = async ({ token }) => {
        try {
            if (!token) {
                toast.error("Admin Not found! Login Now.");
                return false;
            }
            // API
            await axios.get(`${ApiURL}/v1/auth/admin/token-verify`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            ).then((res) => {
                if (res?.data?.success) {
                    dispatch(setCredentials({ admin: res.data?.admin, token: res.data?.token, loading: false })); // keep admin logged in, update token
                    // toast.success(res?.data?.message);
                    return true;
                }
            }).catch((error) => {
                if (error.response) {
                    toast.error(error?.response?.data?.message);
                    // Clear Redux
                    dispatch(logout());
                } else {
                    toast.error(error?.message);
                    // Clear Redux
                    dispatch(logout());
                }
            })
        } catch (error) {
            console.log(error);
            dispatch(logout());
            return false;
        }
    }

    // ADMIN USER CREATION
    // const UserCreationAPI = async (user, token) => {
    //     try {
    //         if (!user.password || !user.name || !token) {
    //             toast.error("Please fill all fields");
    //             return;
    //         }
    //         // Create Form
    //         const UserForm = new FormData();
    //         UserForm.append('password', user?.password);
    //         UserForm.append('name', user?.name);
    //         // API
    //         await axios.post(`${ApiURL}/v1/auth/admin/create-user`, UserForm,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             },
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 toast.success(res?.data?.message);
    //             }
    //         }).catch((err) => {
    //             if (err.response) {
    //                 toast.error(err?.response?.data?.message);
    //             } else {
    //                 toast.error(err?.message);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // ----------------------------------------------

    // USER REGISTER
    // const RegisterUserAPI = async (user) => {
    //     try {
    //         if (!user.email && !user.password && !user.name && !user.mobile) {
    //             toast.error("Please fill all fields");
    //             return;
    //         }
    //         // Create Form
    //         const UserForm = new FormData();
    //         UserForm.append('email', user.email);
    //         UserForm.append('password', user.password);
    //         UserForm.append('name', user.name);
    //         UserForm.append('mobile', user.mobile);
    //         // API
    //         await axios.post(`${ApiURL}/v1/auth/user/register`, UserForm,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             },
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 toast.success(res?.data?.message);
    //                 navigate('/login');
    //             }
    //         }).catch((err) => {
    //             if (err.response) {
    //                 toast.error(err?.response?.data?.message);
    //             } else {
    //                 toast.error(err?.message);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    //-------------------------------------------------------------------------------------

    // ADMIN FORGOT PASSWORD
    // const ForgotAdminPasswordAPI = async (user) => {
    //     try {
    //         if (!user?.email && !user?.OTP && !user?.newPassword) {
    //             toast.error("Please fill all fields");
    //             return;
    //         }
    //         // Create Form
    //         const UserForm = new FormData();
    //         UserForm.append('email', user.email);
    //         UserForm.append('OTP', user.OTP);
    //         UserForm.append('newPassword', user.newPassword);
    //         // API
    //         await axios.put(`${ApiURL}/v1/auth/user/forgot-password`, UserForm,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             },
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 toast.success(res?.data?.message);
    //                 navigate('/login');
    //             }
    //         }).catch((err) => {
    //             if (err.response) {
    //                 toast.error(err?.response?.data?.message);
    //             } else {
    //                 toast.error(err?.message);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // TOKEN VALIDATION
    // const ValidateTokenAPI = async ({ token, email }) => {
    //     try {
    //         if (!token && !email) {
    //             toast.error("Admin Not found! Login Now.");
    //             return;
    //         }
    //         const Form = new FormData();
    //         Form.append('token', token);
    //         Form.append('email', email);
    //         // API
    //         await axios.post(`${ApiURL}/v1/auth/user/token-verify`, Form,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 }
    //             }
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 // toast.success(res?.data?.message);
    //                 return;
    //             }
    //         }).catch((error) => {
    //             if (error.response) {
    //                 toast.error(error?.response?.data?.message);
    //                 // Clear Redux
    //                 dispatch(setLogout());
    //             } else {
    //                 toast.error(error?.message);
    //                 // Clear Redux
    //                 dispatch(setLogout());
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // OTP SEND OR RESEND
    // const SendOtpAPI = async ({ email }) => {
    //     try {
    //         if (!email) {
    //             toast.error("Email Not Found!");
    //             return;
    //         }
    //         const Form = new FormData();
    //         Form.append('email', email);
    //         // API
    //         await axios.post(`${ApiURL}/v1/auth/user/send-otp`, Form,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 }
    //             }
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 toast.success(res?.data?.message);
    //             }
    //         }).catch((error) => {
    //             if (error.response) {
    //                 toast.error(error?.response?.data?.message);
    //             } else {
    //                 toast.error(error?.message);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // GET ADMIN ACCOUNT DATA
    // const GetAdminAccountDataAPI = async ({ token, _id }) => {
    //     try {
    //         if (!token && !_id) {
    //             return;
    //         }
    //         // API 
    //         await axios.get(`${ApiURL}/v1/auth/user/account/${_id}`,
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 }
    //             }
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 setAdminAccount({
    //                     name: res?.data?.user?.name,
    //                     email: res?.data?.user?.email,
    //                     mobile: res?.data?.user?.mobile || '',
    //                     storeName: res?.data?.user?.storeName || '',
    //                     address: {
    //                         street: res?.data?.user?.address?.street || '',
    //                         city: res?.data?.user?.address?.city || '',
    //                         state: res?.data?.user?.address?.state || '',
    //                         zip: res?.data?.user?.address?.zip || '',
    //                         country: res?.data?.user?.address?.country || '',
    //                         address: res?.data?.user?.address?.address || '',
    //                     },
    //                 });
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // UPDATE ADMIN ACCOUNT DATA
    // const UpdateAdminAccountDataAPI = async ({ token, _id, data }) => {
    //     try {
    //         if (!token && !_id) {
    //             return;
    //         }
    //         console.log(data);

    //         const Formdata = new FormData();
    //         data?.storeName ? (Formdata.append('storeName', data.storeName)) : null;
    //         data?.address ? (Formdata.append('address', JSON.stringify(data.address))) : null;
    //         data?.mobile ? (Formdata.append('mobile', data.mobile)) : null;
    //         // API
    //         await axios.put(`${ApiURL}/v1/auth/user/account/${_id}`, Formdata,
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'multipart/form-data',
    //                 }
    //             }
    //         ).then((res) => {
    //             if (res?.data?.success) {
    //                 toast.success(res?.data?.message);
    //             }
    //         }).catch((error) => {
    //             if (error.response) {
    //                 toast.error(error?.response?.data?.message);
    //             } else {
    //                 toast.error(error?.message);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return {
        RegisterAdminAPI,
        LoginAdminAPI,
        ValidateAdminTokenAPI
        // RegisterUserAPI,
        // LoginUserAPI,
        // LoginAdminAPI,
        // ValidateAdminTokenAPI,
        // UserCreationAPI,
        // ValidateUserTokenAPI,
        // LoginUserListAPI, UserList,
        // ForgotAdminPasswordAPI,
        // ValidateTokenAPI,
        // SendOtpAPI,
        // ACCOUNT
        // GetAdminAccountDataAPI, AdminAccount, setAdminAccount, UpdateAdminAccountDataAPI
    }
}