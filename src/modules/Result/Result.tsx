import { RootState } from "../../Store/Store/Store";
import AllQuizData from "./AllQuizData";
import ResultQuiz from "./ResultQuiz";
import { useSelector } from "react-redux";
export default function Result() {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  return (
    <div className="flex flex-col gap-4">
      <ResultQuiz />
      {userRole === "Instructor" && <AllQuizData />}
    </div>
  );
}
