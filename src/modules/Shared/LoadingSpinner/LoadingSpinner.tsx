import { BounceLoader } from "react-spinners";
const LoadingSpinner = () => {
  return (
    <div className="flex items-center gap-4 flex-col justify-center h-screen bg-gray-100">
      <BounceLoader color="#047857" size={200} speedMultiplier={1} />
      <h3 className="text-gray-600 text-2xl">Loading Quiz App..</h3>
    </div>
  );
};

export default LoadingSpinner;
