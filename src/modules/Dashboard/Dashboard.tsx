import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuizCard } from "./QuizCard";
import { StudentCard } from "./StudentCard";
import {
  useGetFirstFiveIncomingQuizzesQuery,
  useGetTopFiveStudentsQuery,
} from "../../Store/ApiStore/Api";
import ViewModal from "../Shared/ViewModal/ViewModal";
import StudentView from "../Instructors/Students/StudentView/StudentView";
import { QuizCardProps, Student } from "../../interfaces/dashboard";
const Dashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const userRole = useSelector((state) => state.auth.user.role);
  const { data: topStudents, isLoading: isLoadingStudents } =
    useGetTopFiveStudentsQuery();
  const { data: IncomingQuizzes, isLoading: isIncoming } =
    useGetFirstFiveIncomingQuizzesQuery();
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Upcoming 5 quizzes
          </h2>
          {isIncoming ? (
            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-8 shadow-sm">
              <i className="fas fa-spin fa-spinner fa-2x"></i>
            </div>
          ) : IncomingQuizzes.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h2>No upcoming quizzes available</h2>
            </div>
          ) : (
            <div className="space-y-4">
              {IncomingQuizzes.map((quiz: QuizCardProps, index: number) => (
                <QuizCard key={index} quiz={quiz} />
              ))}
            </div>
          )}
          <Link
            to="quizzes"
            className="text-md group mt-2 inline-block font-semibold italic text-green-900"
          >
            View Quiz directory
            <i className="fas fa-arrow-right relative bottom-[-2px] transition-all group-hover:translate-x-2"></i>
          </Link>
        </div>
        {userRole === "Instructor" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Top 5 Students
            </h2>
            {isLoadingStudents ? (
              <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-8 shadow-sm">
                <i className="fas fa-spin fa-spinner fa-2x"></i>
              </div>
            ) : topStudents?.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h2>No top students available</h2>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="divide-y divide-gray-200">
                  {topStudents?.map((student: Student, index: number) => (
                    <StudentCard
                      key={index}
                      Student={student}
                      onView={(student) => setSelectedStudent(student)}
                    />
                  ))}
                </div>
              </div>
            )}
            <Link
              to="students"
              className="text-md group mt-2 inline-block font-semibold italic text-green-900"
            >
              View All Students
              <i className="fas fa-arrow-right relative bottom-[-2px] transition-all group-hover:translate-x-2"></i>
            </Link>
          </div>
        )}
      </div>
      <ViewModal
        isOpen={!!selectedStudent}
        title={"Student Details"}
        onClose={() => setSelectedStudent(null)}
        size="lg"
      >
        <StudentView studentData={selectedStudent} />
      </ViewModal>
    </div>
  );
};

export default Dashboard;
