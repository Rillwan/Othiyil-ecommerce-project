import { useSelector } from 'react-redux';
import useMessageAPI from '../../../Hooks/useMessage';
import useSingleEffect from './../../../Hooks/Custom/useSingleEffect';
import useHomeAPI from '../../../Hooks/useHomeAPI';

const Message = () => {
    const { token } = useSelector((state) => state.auth);
    const { GetMessageListAPI, Messages } = useMessageAPI();
    const { FormateDateAndTime } = useHomeAPI();

    // GET ATTRIBUTES RENDER
    useSingleEffect(async () => {
        if (token) {
            await GetMessageListAPI({ token: token });
        }
    });
    // console.log(Messages);

    return (
        <div className="Messages">
            <div className="p-4 bg-gray-200 rounded-3xl">
                <div className="grid gap-4">
                    {/* MESSAGE  */}
                    {
                        Messages?.messages?.map((item, i) => (
                            <div className="p-4 rounded-2xl bg-white" key={i}>
                                <p className="text-gray-600">
                                    {item?.message}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                    <div>
                                        <h4 className="font-semibold text-lg mt-2">{item?.name}</h4>
                                        <p className="text-[12px] text-gray-600 text-center">{FormateDateAndTime(item?.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-semibold text-gray-600 tracking-wide">{item?.mobile}</p>
                                        <p className="text-[12px] text-gray-600">{item?.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-4"></div>
            </div>
        </div>
    )
}

export default Message
