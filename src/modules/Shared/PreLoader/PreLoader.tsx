import { PacmanLoader } from "react-spinners";
const PreLoader = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <PacmanLoader size={50} color="#4A5568" />
    </div>
  );
};

export default PreLoader;
