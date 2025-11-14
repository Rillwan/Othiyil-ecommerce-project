import Logo from "../../assets/favicon.png"
import { motion } from 'framer-motion';

const PreLoader = () => {
    return (
        <div className="relative h-screen w-screen bg-black">
            <motion.div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-[120px] rounded-xl"
                animate={{
                    opacity: [0, 1]
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                }}
            >
                <img src={Logo} className="aspect-square object-cover p-2 bg-black rounded-xl" alt="" />
            </motion.div>
        </div>
    )
}

export default PreLoader

