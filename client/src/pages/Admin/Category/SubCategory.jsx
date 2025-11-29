import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import useCategoryAPI from '../../../Hooks/useCategoryAPI';
import { useSelector } from 'react-redux';
import ApiURL from '../../../Hooks/API/API';
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { CiVideoOn } from "react-icons/ci";

const SubCategory = ({ Item, Refresh }) => {
    const [open, setOpen] = useState(false);
    const [Image, setImage] = useState('');
    const [subCategory, setSubCategory] = useState({
        name: '',
        description: "",
    });
    const { token } = useSelector((state) => state.auth);
    const { CreateSubCategoryAPI, GetCategoriesAPI, DeleteSubCategoryAPI } = useCategoryAPI();

    // Handle Reset
    const HandleReset = () => {
        setSubCategory('');
        setImage({ file: null, previewURL: null });
        // console.log(product.sizes.map((val) => ({ label: val, value: val })));

    }

    // CREATE CATEGORY
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (subCategory && token) {
            await CreateSubCategoryAPI({
                name: subCategory.name,
                description: subCategory.description,
                categoryId: Item?._id,
                token: token,
                Image: Image,
            });
            setSubCategory('');
            setImage({ file: null, previewURL: null });
            // Reload Window
            // window.location.reload();
            // setOpen(false)
            Refresh(token);
        } else {
            toast.error("Please fill");
        }
    }

    // Open Delete Dialog Sub-Category
    const OpenDeleteDialog = async ({ id }) => {
        if (window.confirm("Are you sure to delete this sub-category?")) {
            await DeleteSubCategoryAPI({ id, token: token });
            Refresh(token);
        } else {
            return;
        }
        await GetCategoriesAPI({ token: token });
    }

    return (
        <div className="AddCategory">
            <div className=''>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-green-700 text-center text-white rounded-lg hover:bg-green-500"
                >
                    Add Sub-Category
                </button>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="bg-white p-6 relative">
                                    <div className="">
                                        <div className="">
                                            <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                                                Sub-Categories
                                            </DialogTitle>
                                            <div className='absolute top-0 right-0 p-4 cursor-pointer' onClick={() => setOpen(false)}>
                                                <IoClose className='text-[30px]' />
                                            </div>
                                            {/* SUB CATEGORY LIST */}
                                            <div className='mt-1 px-3'>
                                                <ul className='text-gray-800 grid gap-1'>
                                                    {
                                                        Item?.subcategories?.map((item, i) => (
                                                            <li key={i} className='py-2 px-4 rounded-md bg-gray-200 '>
                                                                <div className='flex gap-3 items-center'>
                                                                    <p className='font-medium'>{i + 1}</p>
                                                                    <img className='bg-gray-300 w-[35px] h-[35px] object-cover object-center rounded-md'
                                                                        src={`${ApiURL}/image/200/${item?.image}`} alt="" />
                                                                    <p className=''>{item?.name}</p>
                                                                    <div className='ml-auto cursor-pointer  flex gap-2 items-center'>
                                                                        <Link to={`/my-admin/category/subcategory/upload-video/${item?._id}`} className='bg-indigo-500 text-white py-1 px-3 rounded-lg flex items-center gap-2'>
                                                                            <CiVideoOn className='text-[25px] ' />Upload Video
                                                                        </Link>
                                                                        <AiFillDelete className='text-[35px] text-red-500 bg-red-200 py-1 px-2 rounded-lg' onClick={() => OpenDeleteDialog({ id: item?._id })} />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            {/* PROGRESS BAR */}
                                            {/* <div className='p-4'>
                                                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                    <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all"
                                                        style={{ width: Progress?.value }}
                                                        style={{ width: '50%' }}
                                                    >
                                                        {Progress?.value}%
                                                    </div>
                                                </div>
                                            </div> */}
                                            <form className="w-full mt-4" onSubmit={HandleSubmit} onReset={HandleReset}>
                                                {/* INPUTS  */}
                                                <div className='grid gap-2'>
                                                    {/* NAME */}
                                                    <div className="">
                                                        <label>Add New Sub-category</label>
                                                        <input type="text" maxLength={100}
                                                            className='px-4 py-2 rounded-xl bg-white  border border-gray-300 w-full mt-1'
                                                            value={subCategory.name} onChange={(e) => setSubCategory({ ...subCategory, name: e.target.value })}
                                                            placeholder="Name" required />
                                                    </div>
                                                    {/* DESCRIPTION */}
                                                    <div className="">
                                                        <label>Description</label>
                                                        <input type="text"
                                                            className='px-4 py-2 rounded-xl bg-white  border border-gray-300 w-full mt-1'
                                                            value={subCategory.description} onChange={(e) => setSubCategory({ ...subCategory, description: e.target.value })}
                                                            placeholder="Description" />
                                                    </div>
                                                    {/* image */}
                                                    <div className="">
                                                        <label>Upload Image</label>
                                                        <input type="file"
                                                            onChange={(e) => setImage(e.target.files[0])}
                                                            className='px-4 py-2 rounded-xl bg-white  border border-gray-300 w-full mt-1'
                                                        />
                                                    </div>
                                                    <div className='flex gap-4'>
                                                        <button className='btn bg-black text-white px-4 py-2 rounded-xl w-full' type='submit'>
                                                            Add
                                                        </button>
                                                        <button className='btn btn-danger px-4 py-2 rounded-xl bg-red-200 text-red-600' type='reset'
                                                            onClick={HandleReset}>
                                                            Clear
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default SubCategory
