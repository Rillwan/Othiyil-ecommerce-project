import Select from 'react-select'
// import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { BsImages } from 'react-icons/bs'
import useSingleEffect from './../../../Hooks/Custom/useSingleEffect';
import useProductAPI from '../../../Hooks/useProductAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const selectStyle = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        boxShadow: 'none',
        borderColor: state.isFocused ? 'var(--color-gray-300)' : 'var(--color-gray-300)',
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '1px',
        borderRadius: 'var(--radius-xl)',
        "&:hover": {
            borderColor: "var(--color-gray-300)"
        },
        padding: '3px 5px',
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        fontSize: '12px',
        backgroundColor: state.isFocused ? 'var(--color-iceBlue)' : 'var(--color-white)',
        color: state.isFocused ? 'var(--color-black)' : 'var(--color-black)',
        borderRadius: 'var(--radius-xl)',
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            fontWeight: 400,
        }
    }
}
const AddProduct = () => {
    const [images, setImages] = useState([]);
    // const animatedComponents = makeAnimated();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        brand: '',
        measurement: '',
        color: ''
    });
    const { token } = useSelector((state) => state.auth);
    const { GetProductAttributesAPI, Attributes, CreateProductAPI, Progress } = useProductAPI();

    // GET ATTRIBUTES RENDER
    useSingleEffect(async () => {
        if (token) {
            await GetProductAttributesAPI({ token: token });
        }
    })

    // HANDLE CREATE PRODUCTS
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (!token) {
            return
        }
        if (!images.length > 0) {
            toast.error("Please add at least one image");
            return;
        } else if (!product.category) {
            toast.error("Please select a category");
            return;
        } else if (!product.brand) {
            toast.error("Please select a brand");
            return;
        }
        const FormProduct = {
            ...product,
            images: images.map((image) => image.file),
        };
        await CreateProductAPI({ product: FormProduct, token: token });
        setProduct({
            name: '',
            description: '',
            category: '',
            subCategory: '',
            brand: '',
            measurement: '',
            color:'',
        })
        setImages([]);
    }

    const HandleReset = () => {
        setProduct({
           name: '',
            description: '',
            category: '',
            subCategory: '',
            brand: '',
            measurement: '',
            color:'',
        })
        setImages([]);
        // console.log(product.sizes.map((val) => ({ label: val, value: val })));

    }

    // images  uploader
    const handleSetImage = (files) => {
        const selectedImages = files.map((file) => {
            return {
                file: file,
                previewURL: URL.createObjectURL(file),
            }
        })
        setImages((prevImages) => [...prevImages, ...selectedImages]);
    }

    // remove image
    // const handleSetImageRemove = (e, index) => {
    //     // e.preventDefault();
    //     // setImages([
    //     //     ...images.slice(0, index),
    //     //     ...images.slice(index + 1, images.length)
    //     // ]);
    // }

    // SELECTED CATEGORY FIND BY SUB CATEGORY
    const SubCategoryOptions = (id) => {
        if (id) {
            const options = Attributes?.categories?.find((cat) => {
                if (cat?._id === id) {
                    return cat?.subCategories?.map((sub) => {
                        return {
                            label: sub?.name,
                            value: sub?._id,
                        }
                    })
                }else{
                    return null;
                }
            })
            return options;
        } else { 
            return null;
        }
    }

    // RENDER SUBCATEGORY
    useEffect(() => {
        if (product?.category) {
            SubCategoryOptions(product.category)
        }
    })

    return (
        <div className="AddProduct p-2">
            <div>
                <h1 className="section-header text-[1.3rem] font-semibold">Add Product</h1>
                <p className=' text-[13px] text-slate-600'>If a design error occurs, reload the window.</p>
                {/* FORM  */}
                <form onSubmit={handleCreateProduct}>
                    <div className="md:flex grid gap-4 mt-4">
                        <div className='w-full'>
                            {/* IMAGE  */}
                            <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
                                {
                                    images.length > 0 && (
                                        <div className='flex justify-center flex-wrap gap-4'>
                                            {
                                                images?.map((data, i) => (
                                                    <div className="w-[120px] bg-gray-200 rounded-xl p-2" key={i}>
                                                        <img className='rounded-lg aspect-square object-cover object-center w-full' src={data.previewURL} alt="" />
                                                        <div className='text-[12px] mt-2'>{data.file.name.slice(0, 13)}</div>
                                                        <div className='text-[10px] text-gray-600 mt-[2px]'>{((data.file.size) / (1024 * 1024)).toFixed(2)} kb</div>
                                                        <button className='text-center bg-red-200 text-red-500 w-full py-1 mt-2 rounded-lg'
                                                        // onClick={(e) => handleSetImageRemove(e, i)}
                                                        >Remove</button>
                                                    </div>
                                                ))}
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
                                        value={""}
                                        onChange={(e) => handleSetImage(Array.from(e.target.files))}
                                        multiple id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        {/* INPUTS  */}
                        <div className='w-full h-fit grid gap-4'>
                            {/* NAME */}
                            <div className="">
                                <label>Product Name</label>
                                <input type="text" maxLength={200}
                                    className='px-4 py-2 rounded-xl border border-gray-300 w-full mt-2'
                                    value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                    placeholder="Product Name" required />
                            </div>
                            {/* CATEGORY */}
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className="">
                                    <label>Category</label>
                                    <Select
                                        options={Attributes?.categories?.map((opt) => ({ label: opt?.name, value: opt?._id }))}
                                        onChange={(selectedOption) => setProduct({ ...product, category: selectedOption.value })}
                                        value={Attributes?.categories?.map((opt) => opt?._id === product?.category && { label: opt?.name, value: opt?._id })}
                                        placeholder='Choose a category'
                                        className='mt-2'
                                        styles={selectStyle}
                                    />
                                </div>
                                <div className="">
                                    <label>Sub-Category</label>
                                    <Select
                                        options={SubCategoryOptions(product.category)?.subCategories?.map((opt) => ({ label: opt?.name, value: opt?._id }))}
                                        onChange={(selectedOption) => setProduct({ ...product, subCategory: selectedOption.value })}
                                        value={product?.subCategory && SubCategoryOptions(product.category)?.subCategories?.map((opt) => opt?._id === product?.subCategory && { label: opt?.name, value: opt?._id })}
                                        placeholder='subcategory' 
                                        className='mt-2'
                                        styles={selectStyle}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {/* BRAND */}
                                <div className="">
                                    <label>Brand</label>
                                    <input type="text" maxLength={100}
                                        className='px-4 py-2 rounded-xl border border-gray-300 w-full mt-2'
                                        value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                                        placeholder="Brand" required />
                                    {/* <Select
                                    // options={gender_option?.map((opt) => ({ label: opt, value: opt }))}
                                    onChange={(selectedOption) => setProduct({ ...product, brand: selectedOption.value })}
                                    value={product?.brand && { label: product.brand, value: product.brand }}
                                    className='mt-2'
                                    placeholder='Select brand'
                                    styles={selectStyle}
                                /> */}
                                </div>
                                {/* COLORS */}
                                <div className="">
                                    <label>Color</label>
                                    <input type="text" maxLength={100}
                                        className='px-4 py-2 rounded-xl border border-gray-300 w-full mt-2'
                                        value={product.color} onChange={(e) => setProduct({ ...product, color: e.target.value })}
                                        placeholder="Color" required />
                                </div>
                            </div>
                            {/* DESCRIPTION  */}
                            <div className="input-box">
                                <label>Description</label>
                                <textarea value={product?.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    className='px-4 py-3 rounded-xl border border-gray-300 w-full mt-2'
                                    name="" id="" rows={6}
                                    placeholder="Short description about the product">
                                </textarea>
                            </div>
                            {/* Measurement: */}
                            <div className="">
                                <label>Measurement</label>
                                <input type="text" maxLength={100}
                                    className='px-4 py-2 rounded-xl border border-gray-300 w-full mt-2'
                                    value={product.measurement} onChange={(e) => setProduct({ ...product, measurement: e.target.value })}
                                    placeholder="Measurement" required />
                            </div>
                            <div className='flex gap-4'>
                                <button className='btn bg-black text-white px-4 py-2 rounded-xl w-full' type='submit'>Create Product</button>
                                <button className='btn btn-danger px-4 py-2 rounded-xl bg-red-200 text-red-600' type='reset' onClick={HandleReset}>Clear</button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* PROCESS  */}
                {
                    Progress?.upload && (
                        <div className='p-6 pb-2 w-full'>
                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all" style={{ width: `${Progress?.value}%` }}>{Progress?.value}%</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AddProduct
