import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosinstance";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../Redux/Slices/Authslice";
import Navbar from "../../../Components/User/Navbar/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [studentName, setstudentName] = useState<string>("");
  const [studentEmail, setstudentEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [wishlistItemCount, setWishlistItemCount] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/editProfile`)
      .then((response) => {
        if (response.data) {
          setStudentDetails(response.data?.studentDetails);
          setstudentName(response.data?.studentDetails?.studentName);
          setstudentEmail(response.data?.studentDetails?.studentEmail);
          setPhone(response.data?.studentDetails?.phone);
          setImage(response.data?.studentDetails?.photo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/getallwishlistitems")
      .then((response) => {
        if (response && response.data) {
          setWishlistItemCount(response.data.wishlistedCourses.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching Wishlist count:", error);
      });
  }, []);

  const handleSubmitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file: File | null = files[0];
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail || !phone || !image) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const imgUrl = await submitImage();
      //console.log(imgUrl, "hhhhhh");
      if (imgUrl) {
        const response = await axiosInstance.put("/updateprofile", {
          studentName,
          studentEmail,
          phone,
          photo: imgUrl,
        });
        if (response.data.message) {
          setStudentDetails(response.data.studentDetails);
          toast.success(response.data.studentDetails);
          dispatch(updateProfile(response.data.userData)); //updating store
          navigate("/userprofile");
        }
      }
    } catch (error) {
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
      <Navbar wishlistItemCount={wishlistItemCount} />
      <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
        <div className="min-h-screen">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="text-3xl font-semibold mb-8 text-center">
              Edit Profile
            </div>
            <div className="flex justify-center items-center">
              <div className="max-w-md w-full mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                      value={studentName}
                      onChange={(e) => setstudentName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                      value={studentEmail}
                      onChange={(e) => setstudentEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
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
                        alt="ProfilePhoto"
                        className="mt-2 h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <span>No image selected</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
