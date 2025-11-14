import { useState } from "react"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useCategoryAPI from "../../../Hooks/useCategoryAPI";
import { useParams } from 'react-router-dom';
import useSingleEffect from "../../../Hooks/Custom/useSingleEffect";

const UploadVideo = () => {
  const [video, setVideo] = useState('');
  const params = useParams();
  const { token } = useSelector((state) => state.auth);
  const { UploadVideoAPI, GetSubCategoryNameAPI, SubCategoryName, Progress } = useCategoryAPI();

  // GET RENDER
  useSingleEffect(async () => {
    if (token && params?.id) {
      await GetSubCategoryNameAPI({ token: token, id: params.id });
    }
  })

  // CREATE CATEGORY
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (video && token && params?.id) {
      await UploadVideoAPI({ video, token, id: params.id });
      // reload window
      window.location.reload();
    } else {
      toast.error("Please fill");
    }
  }

  return (
    <div className="upload-video-page">
      <h2 className="text-[1.3rem] font-semibold">Upload Video</h2>
      <h3 className='text-base font-medium ml-4 mt-2 flex gap-2 items-center'>Category / <span className=''>{SubCategoryName?.name}</span></h3>
      <div>
        <form className="mt-2 w-full max-w-[400px] ml-4" onSubmit={HandleSubmit}>
          {/* INPUTS  */}
          <div className='grid gap-4'>
            {/* NAME */}
            <div className="">
              <input type="file"
                className='px-4 py-2 rounded-xl bg-white  border border-gray-300 w-full mt-2'
                onChange={(e) => setVideo(e.target.files[0])}
                placeholder="Name" required />
            </div>
            <div className='flex gap-4'>
              <button className='btn bg-black text-white px-4 py-2 rounded-xl w-full' type='submit'>
                Upload Video
              </button>
              <button className='btn btn-danger px-4 py-2 rounded-xl bg-red-200 text-red-600' type='reset'
              // onClick={HandleReset}
              >
                Clear
              </button>
            </div>
          </div>
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
        </form>
      </div>
    </div>
  )
}

export default UploadVideo
