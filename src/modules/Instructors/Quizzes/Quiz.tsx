import useModal from "../../../hook/useModal";
import {
  useGetGroupsQuery,
  useGetFirstFiveIncomingQuizzesQuery,
  useGetLastFiveCompletedQuizzesQuery,
  useDeleteQuizMutation,
  useJoinQuizMutation,
  useGetQuizQuestionsWithoutAnswersQuery,
} from "../../../Store/ApiStore/Api";
import ActionQuiz from "./ActionQuiz";
import { BookOpen, Users, Plus } from "lucide-react";
import CreateQuiz from "./CreateQuiz";
import AddUpdateModal from "../../Shared/Add-Update-Modal/AddUpdateModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import SucessMessage from "./SucessMessage";
import Incoming from "./Incoming";
import DeleteConfirmation from "../../Shared/DelecteConfirmation/DelecteConfirmation";
import ViewModal from "../../Shared/ViewModal/ViewModal";
import ViewQuiz from "./ViewQuiz";
import Compeleted from "./Compeleted";
import { useNavigate } from "react-router";
import JoinQuiz from "./JoinQuiz";
import { toast } from "react-toastify";
import AnswerQuiz from "./AnswerQuiz";
import ScoreQuiz from "./ScoreQuiz";
import { GroupOption, type Quiz } from "../../../interfaces/Quiz";
import { Group } from "../../../interfaces/Group";
export default function Quiz() {
  const { data: IncomingQuizzes, isLoading: isIncoming } =
    useGetFirstFiveIncomingQuizzesQuery({});
  const { data: CompletedQuizzes, isLoading: isCompeleted } =
    useGetLastFiveCompletedQuizzesQuery({});
  const { data: Groups } = useGetGroupsQuery({});
  const [deleteQuiz, { status, reset }] = useDeleteQuizMutation();
  const [joinQuiz] = useJoinQuizMutation();
  const UpdateGroup: GroupOption[] = Groups?.map((group: Group) => ({
    value: group._id,
    name: group.name,
  }));
  const { isOpen, closeModal, openModal } = useModal();
  const [createdQuizCode, setCreatedQuizCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [QuizId, setQuizId] = useState<string | null>(null);
  const [QuizIdJion, setQuizIdJoin] = useState<string | null>(null);
  const [Score, setScore] = useState<string | null>(null);
  const { data, isLoading } = useGetQuizQuestionsWithoutAnswersQuery(
    QuizIdJion,
    {
      skip: !QuizIdJion,
    }
  );
  const userRole = useSelector((state) => state.auth.user?.role);
  const viewQuiz: Quiz | undefined = IncomingQuizzes?.filter(
    (item: Quiz) => item?._id === QuizId
  )[0];
  const navigate = useNavigate();
  const handleDeleteQuiz = async (id: string): Promise<void> => {
    await deleteQuiz(id).unwrap();
  };
  const handleViewDelete = (QuizId: string): void => {
    setQuizId(QuizId);
    reset();
    openModal("DeleteQuiz");
  };
  const handleScore = (ScoreQuiz: string): void => {
    setScore(ScoreQuiz);
  };
  const handleviewQuiz = (QuizId: string): void => {
    setQuizId(QuizId);
    openModal("ViewQuiz");
  };
  const handleCreateQuiz = (): void => {
    setQuizId(null);
    openModal("createQuiz");
  };
  const close = (): void => {
    setQuizId(null);
    closeModal();
  };
  const handleQuizCreated = (quizData: { code: string }): void => {
    setCreatedQuizCode(quizData.code);
    setQuizId(null);
    closeModal();
    openModal("success");
  };
  const handleJoinQuiz = async (codeQuiz: string): Promise<void> => {
    try {
      const response = await joinQuiz(codeQuiz).unwrap();
      setQuizIdJoin(response.data.quiz);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };
  const handleCloseSuccessModal = () => {
    closeModal();
    setCreatedQuizCode("");
    setCopied(false);
  };
  const handlerest = () => {
    setScore(null);
    setQuizIdJoin(null);
  };
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(createdQuizCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error: any) {
      toast.error(error || "Failed Copy Code");
    }
  };
  return (
    <>
      <div className="space-y-6">
        {QuizIdJion && !Score && (
          <AnswerQuiz
            data={data?.data}
            handleScore={handleScore}
            isLoading={isLoading}
          />
        )}
        {!QuizIdJion && (
          <div className="flex gap-4">
            {userRole === "Instructor" && (
              <>
                <ActionQuiz
                  onClick={() => {
                    openModal("createQuiz");
                  }}
                  icon={Plus}
                  title="Create New Quiz"
                  description="Set up interactive quizzes"
                />
                <ActionQuiz
                  onClick={() => {
                    navigate("/dashboard/questions");
                  }}
                  icon={BookOpen}
                  title="Question Bank"
                  description="Manage your questions"
                />
              </>
            )}
            {userRole !== "Instructor" && (
              <ActionQuiz
                onClick={() => {
                  openModal("JoinQuiz");
                }}
                icon={Users}
                title="Join Quiz"
                description="Enter a quiz code to participate"
              />
            )}
          </div>
        )}
        {!QuizIdJion && (
          <div className="space-y-6">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Completed Quizzes
            </h2>
            {isCompeleted ? (
              <div className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 py-8 shadow-sm">
                <i className="fas fa-spin fa-spinner fa-2x text-white"></i>
              </div>
            ) : CompletedQuizzes?.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h2>No Completed Quizzes available</h2>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {CompletedQuizzes?.map((quiz: Quiz) => (
                  <Compeleted key={quiz._id} quiz={quiz} />
                ))}
              </div>
            )}
            {userRole === "Instructor" && (
              <>
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Incoming Quizzes
                </h2>
                {isIncoming ? (
                  <div className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 py-8 shadow-sm">
                    <i className="fas fa-spin fa-spinner fa-2x text-white"></i>
                  </div>
                ) : IncomingQuizzes?.length === 0 ? (
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <h2>No Incoming Quizzes available</h2>
                  </div>
                ) : (
                  <Incoming
                    quizzes={IncomingQuizzes}
                    handleDelete={handleViewDelete}
                    handleView={handleviewQuiz}
                  />
                )}
              </>
            )}
          </div>
        )}
        {Score && (
          <ScoreQuiz
            score={Score}
            totalQuestions={data?.data.questions.length}
            scoreperQuestion={data?.data.score_per_question}
            handlerest={handlerest}
          />
        )}
      </div>
      {isOpen("createQuiz") && (
        <AddUpdateModal
          closeModal={close}
          header={QuizId ? "Updata Quiz" : "Create Quize"}
          openModal={handleCreateQuiz}
        >
          <CreateQuiz
            isOpen={() => isOpen("createQuiz")}
            group={UpdateGroup}
            onSuccess={handleQuizCreated}
            id={QuizId}
          />
        </AddUpdateModal>
      )}
      {isOpen("success") && createdQuizCode && (
        <SucessMessage
          copied={copied}
          openModal={() => openModal("success")}
          closeModal={handleCloseSuccessModal}
          createdQuizCode={createdQuizCode}
          handleCopyCode={handleCopyCode}
        />
      )}
      {isOpen("DeleteQuiz") && QuizId && (
        <DeleteConfirmation
          isOpen={openModal}
          onClose={close}
          onConfirm={() => handleDeleteQuiz(QuizId)}
          status={status}
          HeadingMessage=" Delete Quiz"
          Message={`Delete ${viewQuiz?.title} Quiz `}
        />
      )}
      {isOpen("ViewQuiz") && (
        <ViewModal isOpen={openModal} onClose={closeModal} title="Quiz Details">
          <ViewQuiz Quiz={viewQuiz} key={viewQuiz?._id} />
        </ViewModal>
      )}
      {isOpen("JoinQuiz") && (
        <AddUpdateModal
          closeModal={closeModal}
          header={"Quiz Code"}
          openModal={openModal}
          size="2xl"
        >
          <JoinQuiz closeModal={closeModal} handleData={handleJoinQuiz} />
        </AddUpdateModal>
      )}
    </>
  );
}
