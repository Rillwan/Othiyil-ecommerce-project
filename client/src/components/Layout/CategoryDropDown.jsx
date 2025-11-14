import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io'

const CategoryDropDown = () => {
    return (
        <div className='CategoryDropDown'>
            <div className="relative text-right">
                <Menu>
                    <MenuButton className="outline-none flex items-center gap-2 nav-shop">
                        Shop
                        <IoIosArrowDown className="arrow" />
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        
                        className="w-52 z-[99] origin-top-right top-[100px] rounded-xl bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                    >
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                                Bathroom
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                                Duplicate
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                                Archive
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                                Delete
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}

export default CategoryDropDown
