import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { BsImages } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useCategoryAPI from '../../../Hooks/useCategoryAPI';

const AddCategory = ({ FetchData }) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState({ file: null, previewURL: null });
    const [category, setCategory] = useState('');
    const { token } = useSelector((state) => state.auth);
    const { CreateCategoryAPI, GetCategoriesAPI, Categories } = useCategoryAPI();

    // image  uploader
    const handleSetImage = (file) => {
        setImage({
            file: file,
            previewURL: URL.createObjectURL(file),
        });
    }

    // CREATE CATEGORY
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (category && token) {
            await CreateCategoryAPI({ category, image: image?.file, token: token });
            setCategory('');
            setImage(null);
            await GetCategoriesAPI({ token: token });
            setOpen(false);
            FetchData();
        } else {
            toast.error("Please fill");
        }
    }

    // Active Status Category
    const HandleActiveCategory = async (e, id) => {
        e.preventDefault();
        // if (!auth?.token) {
        //     return
        // }
        // if (id) {
        //     await UpdateActiveStatusCategoryAPI({ id, token: auth.token, active: e.target.checked });
        // }
        // await GetCategoryDetailsAPI({ token: auth?.token });
    };

    // console.log(CategoryDetails);

    return (
        <div className="AddCategory">
            <div className=''>
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-xl ml-auto block bg-black px-6 py-2 font-semibold text-gray-200 hover:bg-gray-800"
                >
                    Add Category
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
                                                Add Category
                                            </DialogTitle>
                                            <div className='absolute top-0 right-0 p-4 cursor-pointer' onClick={() => setOpen(false)}>
                                                <IoClose className='text-[30px]' />
                                            </div>
                                            <form className="mt-2 w-full" onSubmit={HandleSubmit}>
                                                {/* IMAGE  */}
                                                <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
                                                    {
                                                        image?.file && (
                                                            <div className='flex justify-center flex-wrap gap-4'>
                                                                <div className="w-[120px] bg-gray-200 rounded-xl p-2" >
                                                                    <img className='rounded-lg w-full h-[120px] object-cover' src={image?.previewURL} alt="" />
                                                                    <div className='text-[12px] mt-2'>{image?.file?.name.slice(0, 13)}</div>
                                                                    <div className='text-[10px] text-gray-600 mt-[2px]'>{((image?.file?.size) / (1024 * 1024)).toFixed(2)} kb</div>
                                                                    <button className='text-center bg-red-200 text-red-500 w-full py-1 mt-2 rounded-lg'
                                                                    // onClick={(e) => handleSetImageRemove(e, i)}
                                                                    >Remove</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center text-center justify-center w-full h-full p-4 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-100">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <BsImages className='w-8 h-8 mb-4 text-gray-500' />
                                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                            <p className="text-xs text-gray-500">PNG or JPG (MAX. 1000x1000px)</p>
                                                        </div>
                                                        <input
                                                            onChange={(e) => handleSetImage(e.target.files[0])}
                                                            id="dropzone-file" type="file" className="hidden" />
                                                    </label>
                                                </div>
                                                {/* INPUTS  */}
                                                <div className='mt-4 grid gap-4'>
                                                    {/* NAME */}
                                                    <div className="">
                                                        <label>Category Name</label>
                                                        <input type="text" maxLength={100}
                                                            className='px-4 py-2 rounded-xl bg-white  border border-gray-300 w-full mt-2'
                                                            value={category} onChange={(e) => setCategory(e.target.value)}
                                                            placeholder="Name" required />
                                                    </div>
                                                    <div className='flex gap-4'>
                                                        <button className='btn bg-black text-white px-4 py-2 rounded-xl w-full' type='submit'>
                                                            Create Category
                                                        </button>
                                                        <button className='btn btn-danger px-4 py-2 rounded-xl bg-red-200 text-red-600' type='reset'
                                                        // onClick={HandleReset}
                                                        >
                                                            Clear
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* PROGRESS BAR */}
                                {/* <div className='p-6'>
                                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all"
                                            style={{ width: Progress?.value }}
                                            style={{ width: '50%' }}
                                        >
                                            {Progress?.value}%
                                        </div>
                                    </div>
                                </div> */}
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default AddCategory
