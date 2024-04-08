import '../../Components/Common/Loader.css'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="mb-4 text-2xl font-bold text-gray-800">Processing...</div>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    <div className="mt-2 text-sm font-medium text-gray-600">Please wait</div>
  </div>
  );
};

export default LoadingSpinner;