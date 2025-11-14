
// ===== Framer Motion Variants ======
// This file contains the animation variants for Framer 
// Motion. These variants are used to define the animation

// Card ViewPort and opacity
const CardViewPortVariants = {
    offscreen: {
        y: 100,
        scale: 0.5,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
        }
    }
}
// ============================ EXPORT =============================
const useFarmerMotion = () => {
    return {
        CardViewPortVariants,
    }
}

export default useFarmerMotion