import logo1 from "../../../assets/logo1.jpg";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newpassword, setNewpassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [email , setEmail] = useState<string>('')



  useEffect(() => {
    if(location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, []);

  const passwordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post("/resetPassword", { newpassword, confirmpassword , email})
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/login");
        }
      });
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-blue-100">
      <div className="sm:max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <img className="mx-auto h-10 w-auto" src={logo1} alt="Smart Learning" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
          Reset Password
        </h2>

        <form
          onSubmit={passwordReset}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                placeholder="Enter your new password"
                autoComplete="new-password"
                required
                className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="rounded-md shadow-sm">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                placeholder="Repeat Password"
                autoComplete="new-password"
                required
                className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              RESET PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
