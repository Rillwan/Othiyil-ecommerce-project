import { useSelector } from 'react-redux';
import useSingleEffect from './../../../Hooks/Custom/useSingleEffect';

const Reels = () => {
    const { token } = useSelector((state) => state.auth);

    // GET ATTRIBUTES RENDER
    useSingleEffect(async () => {
        if (token) {
            // await GetMessageListAPI({ token: token });
        }
    });
    // console.log(Messages);

    return (
        <div className="Reels">
            <div className="p-2 ">
                <h3 className='text-2xl font-semibold'>Reels</h3>
                {/* UPLOAD REELS */}

                <div className="flex gap-4 flex-wrap mt-6">
                    {/* REELS  */}
                    {
                        [...Array(1)]?.map((Reels, i) => (
                            <div key={i} className='bg-gray-100 p-4 rounded-xl'>
                                <img className='w-[200px] aspect-[2/3] bg-white rounded-lg outline-none border-none'
                                    src="" alt=""
                                />
                                <p className='mt-2 font-semibold'>Lorem, ipsum.</p>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-4"></div>
            </div>
        </div>
    )
}

export default Reels
