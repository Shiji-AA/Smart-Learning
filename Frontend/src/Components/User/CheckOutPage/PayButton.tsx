import { axiosInstance } from "../../../api/axiosinstance";
interface CourseDetails {
  // Define the properties of CourseDetails here
  // Example:
  id: number;
  title: string;
  // Add other properties as needed
}

interface PayButtonProps {
  courseDetails: CourseDetails; // Specify the type of courseDetails prop
}

function PayButton({ courseDetails }: PayButtonProps) {
  const handleCheckOut = () => {
    axiosInstance
      .post("/stripepayment", { courseDetails }) //for stripe payments , api calling to stripe server
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div>
        <button
          onClick={handleCheckOut}
          className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        >
          Check out
        </button>
      </div>
    </>
  );
}

export default PayButton;
