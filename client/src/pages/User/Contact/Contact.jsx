import { useState } from "react";
import { PiPhoneCall } from "react-icons/pi";
import useHomeAPI from "../../../Hooks/useHomeAPI";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import ContactImg from '../../../assets/images/contact.jpg'
import { motion } from 'framer-motion';

const Contact = () => {
    const [Contact, setContact] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    })
    const { SubmitContactForm } = useHomeAPI();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        await SubmitContactForm({ name: Contact.name, email: Contact.email, mobile: Contact.mobile, message: Contact.message });
        setContact({
            name: "",
            email: "",
            mobile: "",
            message: "",
        })
    }
    return (
        <div className='AboutPage'>
            {/* TOP  */}
            <div className='bg-gray-900 text-white'>
                <div className='h-[330px] grid items-center'>
                    <motion.div className="container" 
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: { delay: 0.3, duration: 0.4, ease: 'easeIn' }
                        }}
                        >
                        <h2 className='text-6xl mt-6 text-center font-light'>Contact Us</h2>
                        <p className='text-center mt-4 font-thin'>Reach out to Othiyil for expert guidance, quality products, and trusted support.</p>
                    </motion.div>
                </div>
                <div className="container">
                    <div>
                        <h3 className='text-lg pb-8 font-light'>Home / <span className='opacity-40'>Contact Us</span></h3>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-6">
                        <div className="lg:col-span-2">
                            <h3 className='text-3xl font-light'>Contact Information</h3>
                            <p className='mt-3'>Your trusted connection to Othiyil’s products, services, and support team.</p>
                            <div className='mt-8 flex flex-wrap items-center gap-6'>
                                <div>
                                    <a className="text-center btn block" href="tel:+919656337712" target="_blank" rel="noopener noreferrer">
                                        <PiPhoneCall className="p-3 pt-5 mx-auto text-[60px] bg-gray-200 rounded-t-full" />
                                        <p className="text-[13px] mt-3">Call</p>
                                    </a>
                                </div>
                                <div>
                                    <a className="text-center btn block" href="https://wa.me/+919656337712" target="_blank" rel="noopener noreferrer">
                                        <FaWhatsapp className="p-3 pt-5 mx-auto text-[60px] bg-gray-200 rounded-t-full" />
                                        <p className="text-[13px] mt-3">WhatsApp</p>
                                    </a>
                                </div>
                                <div>
                                    <a className="text-center btn block" href="https://maps.app.goo.gl/UXX27djo7gkxfDp69" target="_blank" rel="noopener noreferrer">
                                        <FaLocationDot  className="p-3 pt-5 mx-auto text-[60px] bg-gray-200 rounded-t-full" />
                                        <p className="text-[13px] mt-3">Location</p>
                                    </a>
                                </div>
                                <div>
                                    <a className="text-center btn block" href="https://www.instagram.com/othiyilbuildingmaterials#/" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram  className="p-3 pt-5 mx-auto text-[60px] bg-gray-200 rounded-t-full" />
                                        <p className="text-[13px] mt-3">Instagram</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="relative p-4 lg:col-span-1">
                            <div className="lg:absolute top-[-240px] border p-[6px] rounded-t-full border-gray-900 bg-white"> 
                                <img className="w-[280px] mx-auto h-[430px] object-cover rounded-t-full" 
                                 src={ContactImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CONTACT  */}
            <div className="mt-10 md:mt-20">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* FORM  */}
                        <div className="bg-gray-200 rounded-2xl px-6 py-8 h-fit">
                            <h3 className="font-medium text-2xl">Get in touch</h3>
                            <p className="text-[13px] mt-2 text-gray-600">
                                We’d love to hear from you! Fill out the form below to share your inquiries, feedback, or requests — and our team will get back to you as soon as possible.
                            </p>
                            <form onSubmit={HandleSubmit} className="mt-6 grid gap-2">
                                <input onChange={(e) => setContact({ ...Contact, name: e.target.value })} value={Contact.name}
                                    type="text" className=" rounded-3xl py-2 px-6 w-full bg-white placeholder:text-[12px]" placeholder="Name" />
                                <input onChange={(e) => setContact({ ...Contact, email: e.target.value })} value={Contact.email}
                                    type="email" name="email" className=" rounded-3xl py-2 px-6 w-full bg-white placeholder:text-[12px]" placeholder="Email" />
                                <input onChange={(e) => setContact({ ...Contact, mobile: e.target.value })} value={Contact.mobile}
                                    type="number" className=" rounded-3xl py-2 px-6 w-full bg-white placeholder:text-[12px]" placeholder="Mobile" />
                                <textarea onChange={(e) => setContact({ ...Contact, message: e.target.value })} value={Contact.message}
                                    rows={5} className="rounded-3xl py-3 px-6 w-full bg-white placeholder:text-[12px]" placeholder="Message"></textarea>
                                <button type="submit" className="btn px-4 py-2 bg-black rounded-3xl text-white">Send Message</button>
                            </form>
                        </div>
                        {/* LOCATION */}
                        <div className="px-6 py-8">
                            <h3 className="font-medium text-2xl">Our Location</h3>
                            {/* <p className="text-[13px] mt-2 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, quam.</p> */}
                            <div className="w-full h-[400px] mt-4 relative">
                                <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3575747592454!2d75.7265521!3d11.6690511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba67ff04603bd3f%3A0x90df81a4aabdba19!2sOTHIYIL%20Building%20Materials%20llp%20mokeri!5e0!3m2!1sen!2ssa!4v1762382725323!5m2!1sen!2ssa" 
                                 style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
