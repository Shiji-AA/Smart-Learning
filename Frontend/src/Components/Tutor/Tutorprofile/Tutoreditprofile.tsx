import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosInstanceTutor } from "../../../api/axiosinstance";
import { updateTutorProfile } from "../../../Redux/Slices/Tutorslice";
import Tutornavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";
import axios from "axios";
import toast from "react-hot-toast";

function Tutoreditprofile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tutorName, setTutorName] = useState("");
  const [tutorEmail, setTutorEmail] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [onlineavailability, setOnlineavailability] = useState("");
  const [phone, setPhone] = useState("");
  const [tutorDetails, setTutorDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstanceTutor
      .get(`/tutoreditProfile`)
      .then((response) => {
        if (response.data) {
          const tutorDetails = response.data?.tutorDetails;
          setTutorDetails(tutorDetails);
          setTutorName(tutorDetails?.tutorName);
          setTutorEmail(tutorDetails?.tutorEmail);
          setEducation(tutorDetails?.education);
          setExperience(tutorDetails?.experience);
          setOnlineavailability(tutorDetails?.onlineavailability);
          setPhone(tutorDetails?.phone);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmitChange = (e) => {
    try {
      const inputElement = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !tutorName.trim() ||
      !tutorEmail ||
      !education ||
      !experience ||
      !onlineavailability ||
      !image
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const imgUrl = await submitImage();
      console.log(imgUrl, "hhhhhh");
      if (imgUrl) {
        const response = await axiosInstanceTutor.put("/tutorupdateprofile", {
          tutorName,
          tutorEmail,
          phone,
          education,
          experience,
          onlineavailability,
          photo: imgUrl,
        });
        if (response.data.message) {
          toast.success(response.data.tutorDetails);
          dispatch(updateTutorProfile(response.data.tutorData)); //updating store
          navigate("/tutorprofile");
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
      <Tutornavbar />
      <div className="bg-gradient-to-b from-blue-200 to-white p-4 rounded-lg">
        <div className="min-h-screen">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="text-3xl font-semibold mb-8 text-center">
              Edit Tutor Profile
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
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
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
                      value={tutorEmail}
                      onChange={(e) => setTutorEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Highest Qualification
                    </label>
                    <input
                      type="text"
                      id="education"
                      className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      id="experience"
                      className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Online Availability
                    </label>
                    <input
                      type="text"
                      id="onlineavailability"
                      className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                      value={onlineavailability}
                      onChange={(e) =>
                        setOnlineavailability(e.target.value)
                      }
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
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="ProfilePhoto"
                        className="mt-2 h-16 w-16 object-cover rounded"
                      />
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

export default Tutoreditprofile;
