import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import ApiURL from "./API/API";

const useMessageAPI = () => {
    const [Messages, setMessages] = useState({
        messages: [],
        total: '',
    })

    // ---------- PUBLIC ----------------

    // ------------------------------------------------------------
    // ---------- ADMIN ----------------

    // ADMIN MESSAGE LIST
    const GetMessageListAPI = async ({ token }) => {
        try {
            if (!token) {
                return;
            }
            // API REQUEST
            await axios.get(`${ApiURL}/v1/message/admin/list`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            ).then((res) => {
                if (res?.data?.success) {
                    if (res?.data?.result?.length > 0) {
                        setMessages((prev) => {
                            return {
                                messages: [...prev.messages, ...res.data.result],
                                total: res.data?.total,
                            }
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

    return {
        GetMessageListAPI, Messages
    }
}

export default useMessageAPI;