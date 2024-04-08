import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../Components/User/Navbar/Navbar";
import AuthrootState from "../../../Redux/Rootstate/Authstate";
import {
  axiosInstance,
  axiosInstancePayment,
} from "../../../api/axiosinstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  courseDuration: string;
  courseFee: number;
  isEnrolled: boolean;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

const CheckoutPage = () => {
  const userData = useSelector((state: AuthrootState) => state.auth.userdata);
  const studentId = userData?.id; //to payment controller to create order

  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [wishlistItemCount,setWishlistItemCount] =useState<number>(0)
  
//For wishlistCount
  useEffect(()=>{
    axiosInstance.get('getallwishlistitems')
    .then((response)=>{
      if(response && response.data){
        setWishlistItemCount(response.data.wishlistedCourses.length)
      }
    })
    .catch((error)=>{
      console.error("Error in fetching wishlistCount",error)
    })

  },[])

  useEffect(() => {
    axiosInstance
      .get(`/checkout/${id}`)
      .then((response) => {
        if (response.data) {
          setCourseDetails(response.data.courseDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast("Error fetching data. Please try again later.");
      });
  }, []);

  const handleSubmit = (courseDetails: Course | null) => (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!courseDetails) {
      console.error("No course details available.");
      toast.error("No course details available.");
      return;
    }
    axiosInstancePayment
      .post("/create-checkout-session", { courseDetails, studentId })
      .then((response) => {
        const url = response.data.url;
        window.location.href = url;
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
        toast.error("Error creating checkout session. Please try again later.");
      });
  };

  return (
    <>
      <Navbar  wishlistItemCount={wishlistItemCount}/>
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #3182CE, #ffffff)" }}
      >
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Checkout Here
          </h1>

          <div className="flex justify-between items-center mb-8">
            <div className="max-w-md cursor-pointer rounded-lg bg-white p-4 shadow-md">
              <img
                className="w-full h-60 object-cover rounded-lg"
                src={courseDetails?.photo}
                alt="course"
              />
              <div className="mt-4">
                <h4 className="font-bold text-gray-800">
                  {courseDetails?.courseName}
                </h4>
                <p className="text-gray-600">
                  {courseDetails?.courseDescription}
                </p>
                <p className="text-gray-700 mt-2">
                  Duration: {courseDetails?.courseDuration}
                </p>
              </div>
            </div>

            <div className="max-w-md cursor-pointer rounded-lg bg-white bg-opacity-90 p-4 shadow-md">
              <h5 className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                ₹ {courseDetails?.courseFee}
              </h5>
              <h2 className="text-xl font-semibold text-blue-600">
                Pay with Stripe
              </h2>
              <p className="text-gray-600 mt-2">
                Secure and convenient payments with Stripe.
              </p>
              <form onSubmit={handleSubmit(courseDetails)} method="POST">
                <button
                  type="submit"
                  className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
