import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 text-white">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-8xl font-bold text-gray-300">404</h1>
        <h2 className="mb-3 text-2xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-400">
          Sorry, the page you are looking for doesnt exist or has been moved
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 transition-colors duration-200 hover:bg-blue-700"
          >
            <Home className="h-5 w-5" />
            <span>Home Page</span>
          </button>
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center space-x-2 rounded-lg border border-gray-600 px-6 py-3 transition-colors duration-200 hover:border-gray-500"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
