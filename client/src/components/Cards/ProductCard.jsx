import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApiURL from '../../Hooks/API/API';
import { TextLimit } from '../Optimized/TextLimit';

const ProductCard = ({ data, i }) => {
    return (
        <>
            <motion.div
                initial={{
                    y: 100,
                    scale: 0.5,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: 0.1 * i,
                        type: "spring",
                        duration: 0.8,
                    }
                }}
                className="bg-gray-100 w-full hover:bg-white hover:shadow-lg transition-colors"
            >
                <Link to={`/product/${data?._id}`} className="block p-6 ">
                    <div>
                        <img className="aspect-square object-cover bg-white" src={`${ApiURL}/image/500/${data?.images[0]}`} alt="" />
                    </div>
                    <div className="mt-4">
                        <div className="text-base pb-2 font-medium border-b">
                            <TextLimit text={data?.name} limit={25} />
                        </div>
                        <div className="mt-2 flex justify-between items-center gap-4">
                            <p className="text-sm text-gray-600 text-[12px]">{data?.category?.name}</p>
                            <p className="font-medium">{data?.brand}</p>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </>
    )
}

export default ProductCard
