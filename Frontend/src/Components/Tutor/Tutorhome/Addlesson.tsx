import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import toast from 'react-hot-toast';
import axios from 'axios';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  video: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  courseName: string,
  courseDuration: string
  courseDescription: string,
  photo: string,
  courseFee: number,
  createdAt: Date,
  updatedAt: Date
}

function Addlesson() {
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [categoryDetails, setCategoryDetails] = useState<Lesson[]>([]);
  const [selectcategory, setSelectcategory] = useState("")
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [selectcourse, setSelectcourse] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");

  useEffect(() => {
    axiosInstanceTutor.get('/categories')
      .then((response) => {
        if (response.data.categoryDetails) {
          console.log(response.data.categoryDetails, "I am data");
          setCategoryDetails(response.data.categoryDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  useEffect(() => {
    axiosInstanceTutor.get('/getallcourse')
      .then((response) => {
        if (response.data.courseDetails) {
          console.log("i am course details", courseDetails)
          setCourseDetails(response.data.courseDetails)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      })
  }, [])

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        console.log(file,"IVDE UNdU")
        setVideo(file)
      } else {
        setVideo(null)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const submitVideo = async () => {
    try {
      if (video) {
        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "smartlearning");
        data.append("cloud_name", "shijiaa");
        console.log(video, "video UNDO?");
        const response = await axios.post(
           "https://api.cloudinary.com/v1_1/shijiaa/video/upload",
          data
        )
        console.log(response,"ivide vaada");
        if (response.data && response.data.url) {
          console.log("Video uploaded successfully. URL:", response.data.url);
          setCloudanaryURL(response.data.url);
          console.log(response.data.url, "url ivide anutto")
        } else {
          console.error("Invalid response from Cloudinary", response.data);
          toast.error(
            "Error uploading image: Invalid response from Cloudinary"
          );
        }
      } else {
        toast.error("No video selected");
      }
    } catch (error) {
      console.error("Error while Uploading Video:", error);
      toast.error("Error uploading video: Please try again later");
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitVideo();

    axiosInstanceTutor.post('/addlesson', { title, description, selectcategory, selectcourse, video: cloudanaryURL })
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message)
          navigate(`/singleview/${course?._id}`)
        }
      })
      .catch((error) => {
        if (error.response.data.error) {
          toast.error(error.response.data.error)
        }
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="mt-6 shadow-md p-8 w-full max-w-md rounded-lg border border-gray-400">
        <form onSubmit={handleSubmit} className="bg-white rounded p-4 sm:p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select value={selectcategory} onChange={(e) => setSelectcategory(e.target.value)} className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded">
              <option>Select Category</option>
              {categoryDetails?.map((category: any) => (
                <option key={category?._id} value={category?._id}>{category?.title}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <select value={selectcourse}
              onChange={(e) => setSelectcourse(e.target.value)}
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded">
              <option>Select Course</option>
              {courseDetails?.map((course) => (
                <option key={course?._id}
                  value={course._id}>
                  {course?.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lesson Title
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
              placeholder="Lesson Title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lesson Description
            </label>
            <textarea
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              placeholder="Lesson description"
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lesson Video
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="file"
              accept="video/*"
              onChange={handleSubmitChange}
            />
            {video && (
            <video
              controls
              src={URL.createObjectURL(video)}
              style={{ width: "100%" }}
            />
          )}
          </div>
          <div className="mb-2">
            <button
              className="w-full py-2 px-3 text-white font-bold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
              type="submit">
              Add Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addlesson;
