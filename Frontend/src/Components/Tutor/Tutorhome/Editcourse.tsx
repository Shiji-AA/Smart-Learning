import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { axiosInstanceTutor } from "../../../api/axiosinstance";
import Tuturnavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";
interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// interface Course {
//   _id: string;
//   courseName: string;
//   courseDescription: string;
//   courseDuration: string;
//   courseFee: number | number;
//   photo: string;
//   createdAt: string;
//   updatedAt: string;
//   category: string; // Add category field to Course interface
// }

function Editcourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseFee, setCourseFee] = useState<number | string>("");
  const [courseDescription, setCoursedescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  //const [courseDetails, setCourseDetails] = useState<Course[]>([]);
 

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


  useEffect(() => {
    axiosInstanceTutor
      .get(`/editcourse/${id}`)
      .then((response) => {
        if (response.data && response.data.courseDetails) {
         // console.log(response.data.courseDetails, "responseee");
          const courseDetails = response.data.courseDetails;
          //setCourseDetails(courseDetails);
          setCourseName(courseDetails.courseName);
          setCourseDuration(courseDetails.courseDuration);
          setCourseFee(courseDetails.courseFee);
          setCoursedescription(courseDetails.courseDescription);
          setSelectCategory(courseDetails.category);
          if (courseDetails.photo && courseDetails.photo.length > 0) {
            setImage(courseDetails.photo[0]); // Access the first element of the array
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        const fileExtension = file.name.split(".").pop();
        if (!fileExtension) {
          window.alert("Invalid file name. Please ensure the file has an extension.");
          return;
        }
        const allowedFileTypes = ["png", "jpg", "jpeg"];
        if (!allowedFileTypes.includes(fileExtension.toLowerCase())) {
          window.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
          return;
        }
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
        // setCloudanaryURL(response.data.url);
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

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (
      !courseName.trim() ||
      !courseDuration.trim() ||
      !courseFee ||
      !courseDescription.trim() ||
      !image ||
      !selectCategory.trim()
    ) {
      return toast.error("All fields are required");
    }

    // Validation for course name
if (!courseName.trim()) {
  return toast.error ("Course name is required");
}

// Validation for course duration
if (!courseDuration.trim()) {
  return toast.error("Course duration is required");
}

// Validation for course fee
if (!courseFee) {
  return toast.error( "Course fee is required");
} 

// Validation for course description
if (!courseDescription.trim()) {
  return toast.error("Course description is required");
}

// Validation for select category
if (!selectCategory.trim()) {
  return toast.error("Category is required");
}

// Validation for image upload
if (!image) {
  return toast.error("Image is required");
}

setLoading(true);

    try {
      // Upload the image and get the URL
      const imgUrl = await submitImage();
      if (imgUrl) {
        // Once image is uploaded, update the course data with the new image URL
        const response = await axiosInstanceTutor.put(`/updatecourse/${id}`, {
          courseName,
          courseDuration,
          courseFee,
          courseDescription,
          category: selectCategory,
          photo: imgUrl,
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
              onSubmit={handleUpdateSubmit}
              className="bg-blue-50 rounded p-4 sm:p-8"
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Name
                </label>
                <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Course Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Duration
                </label>
                <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                  type="text"
                  value={courseDuration}
                  onChange={(e) => {
                    setCourseDuration(e.target.value);
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
                    setCourseFee(e.target.value);
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

              {/* //select category */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  value={selectCategory}
                  onChange={(e) => setSelectCategory(e.target.value)}
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

                {image ? (
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt="Course"
                    className="mt-2 h-16 w-16 object-cover rounded"
                  />
                ) : (
                  <span>No image selected</span>
                )}


              </div>
              <div className="flex justify-center">
                <button
                  className="w-1/2 py-2 px-4 text-white font-bold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
                  type="submit"
                >
                  {loading ? "Uploading" : "Update Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editcourse;
