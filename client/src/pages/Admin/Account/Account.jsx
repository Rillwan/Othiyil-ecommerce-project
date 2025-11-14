
import { useSelector } from 'react-redux';

const Account = () => {
    const { admin} = useSelector((state) => state.auth);
    
    return (
        <div className="Account p-4 rounded-xl">
            <div className="">
                <h3 className="font-semibold text-xl">My Account</h3>
                <div className="rounded-xl overflow-x-auto mt-3 p-4 bg-gray-200">
                    <p className="text-gray-600">Name: {admin?.name}</p>
                    <p className="text-gray-600">Email: {admin?.email}</p>
                    <p className="text-gray-600">Role: {admin?.role}</p>
                </div>
            </div>
        </div>
    )
}

export default Account
