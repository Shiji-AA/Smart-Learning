import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import TutorrootState from "../../../Redux/Rootstate/Tutorstate";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import axios from "axios";
import Tuturnavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

function Addcourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseName, setCoursename] = useState<string>("");
  const [courseDuration, setCourseduration] = useState<string>("");
  const [courseFee, setCoursefee] = useState<number | string>(0);
  const [courseDescription, setCoursedescription] = useState<string>("");
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  const [selectcategory, setSelectcategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");
  const tutorData = useSelector(
    (state: TutorrootState) => state.tutor.tutordata
  );

  useEffect(() => {
    axiosInstanceTutor
      .get("/categories")
      .then((response) => {
        if (response.data.categoryDetails) {
          setCategoryDetails(response.data.categoryDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        setImage(file);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const submitImage = async () => {
    try {
      if (!image) {
        throw new Error("No image selected");
      }
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "smartlearning");
      data.append("cloud_name", "shijiaa");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/shijiaa/image/upload",
        data
      );
      if (response.data && response.data.url) {
        setCloudanaryURL(response.data.url);
        return response.data.url;
      } else {
        throw new Error("Invalid response from Cloudinary");
      }
    } catch (error) {
      console.error("Error while Uploading Image:", error);
      toast.error("Error uploading image: Please try again later");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !courseName.trim() ||
      !courseDuration.trim() ||
      !courseFee ||
      !courseDescription.trim() ||
      !selectcategory ||
      !image
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const imgUrl = await submitImage();
      if (imgUrl) {
        const response = await axiosInstanceTutor.post("/addcourse", {
          courseName,
          courseDuration,
          courseFee,
          courseDescription,
          selectcategory,
          selecttutor: tutorData?.tutorId,
          image: imgUrl,
        });
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/getallcourse");
        }
      }
    } catch (error:any) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tuturnavbar />
      <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
        <div className="min-h-screen flex items-center justify-center">
          <div className="mt-8 shadow-md p-8 w-full max-w-md rounded-lg border border-gray-400 bg-white">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-300 rounded p-4 sm:p-8 h-full"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Name
                </label>
                <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  type="text"
                  value={courseName}
                  onChange={(e) => {
                    setCoursename(e.target.value);
                  }}
                  placeholder="Course Name"
                />
              </div>
              {/* Other form fields */}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Duration
                </label>
                <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  type="text"
                  value={courseDuration}
                  onChange={(e) => {
                    setCourseduration(e.target.value);
                  }}
                  placeholder="Duration"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Price
                </label>
                <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  type="number"
                  value={courseFee}
                  onChange={(e) => {
                    setCoursefee(e.target.value);
                  }}
                  placeholder="Price"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  placeholder="Description"
                  value={courseDescription}
                  onChange={(e) => {
                    setCoursedescription(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  value={selectcategory}
                  onChange={(e) => setSelectcategory(e.target.value)}
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                >
                  <option>Select Category</option>
                  {categoryDetails?.map((category: any) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  type="file"
                  onChange={handleSubmitChange}
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Course"
                    className="mt-2 h-16 w-16 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex justify-between pl-4">
                <button
                  className="w-1/2 py-2 px-4  text-white font-bold bg-blue-500  focus:outline-none focus:shadow-outline hover:bg-blue-700"
                  type="submit"
                >
                  {loading ? "Uploading" : "Create Course"}
                </button>              
              </div>              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Addcourse;
