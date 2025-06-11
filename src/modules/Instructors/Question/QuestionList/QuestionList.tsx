import { PlusCircle } from "lucide-react";
import AddUpdateModal from "../../../Shared/Add-Update-Modal/AddUpdateModal";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../../../Store/ApiStore/Api";
import DeleteConfirmation from "../../../Shared/DelecteConfirmation/DelecteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  EditingQuestionId,
  RemoveQuestionId,
} from "../../../../Store/QuestionSlice/QuestionSlice";
import ViewModal from "../../../Shared/ViewModal/ViewModal";
import QuestionView from "../QuestionView/QuestionView";
import QuestionData from "../QuestionData/QuestionData";
import useModal from "../../../../hook/useModal";
import Pagination from "../../../Shared/Pagination/Pagination";
import { useState } from "react";
import { useFilter } from "../../../../hook/useFilter";
import Filteration from "../../../Shared/Filteration/Filteration";
import QuestionTable from "./QuestionTable";
import { Question, SearchFilterConfig } from "../../../../interfaces/Question";
import QuestionGrid from "./QuestionGrid";
export default function QuestionList() {
  const { data, isLoading, isError } = useGetQuestionsQuery({});
  const QuestionId = useSelector((state) => state.Question.QuestionId);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setitemsPerPage] = useState<number>(6);
  const { isOpen, closeModal, openModal } = useModal();
  const [deleteQuestion, { status, reset }] = useDeleteQuestionMutation();
  const viewQuestion: Question | undefined = data?.filter(
    (item: Question) => item?._id === QuestionId
  )[0];
  const dispatch = useDispatch();
  console.log(data, "viewQuestion");
  const searchFilterConfig: SearchFilterConfig = {
    filters: [
      {
        key: "title",
        type: "search",
        label: "Search by Title",
        placeholder: "Search questions...",
        className: "flex-1",
        filterFunction: (item: Question, value: string) =>
          item.title.toLowerCase().includes(value.toLowerCase()),
      },
      {
        key: "difficulty",
        type: "select",
        label: "Difficulty Level",
        placeholder: "All Difficulties",
        className: "lg:w-48",
        filterFunction: (item: Question, value: string) =>
          item.difficulty === value,
        getUniqueValues: (data: Question[]) => [
          ...new Set(data.map((question) => question.difficulty)),
        ],
      },
      {
        key: "type",
        type: "select",
        label: "Question Type",
        placeholder: "All Types",
        className: "lg:w-48",
        filterFunction: (item: Question, value: string) => item.type === value,
        getUniqueValues: (data: Question[]) => [
          ...new Set(data.map((question) => question.type)),
        ],
      },
    ],
  };
  const {
    filters,
    filteredData,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    getUniqueValues,
    totalItems,
  } = useFilter(data, searchFilterConfig);

  const handleEditQuestion = (id: string): void => {
    dispatch(EditingQuestionId(id));
    openModal("AddQuestion");
  };
  const handleViewQuestion = (id: string): void => {
    dispatch(EditingQuestionId(id));
    openModal("ViewQuestion");
  };
  const handleFormSuccess = (): void => {
    dispatch(RemoveQuestionId());
    closeModal();
  };
  const handleDeleteQuestion = async (id: string): Promise<void> => {
    await deleteQuestion(id).unwrap();
  };
  const handleViewDelete = (id: string): void => {
    dispatch(EditingQuestionId(id));
    reset();
    openModal("DeleteQuestion");
  };
  const handleAddNew = (): void => {
    dispatch(RemoveQuestionId());
    openModal("AddQuestion");
  };

  const Questions = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div>
        <div className="mb-8 flex items-center justify-between rounded-xl border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-6 shadow-lg">
          <div>
            <h2 className="mb-1 text-3xl font-bold text-white">
              Bank Question
            </h2>
          </div>
          <button
            onClick={handleAddNew}
            className="group flex transform items-center rounded-full bg-gradient-to-r from-slate-700 to-gray-800 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:from-slate-600 hover:to-gray-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
          >
            <span className="mr-3 text-xl transition-transform duration-300 group-hover:rotate-90">
              <PlusCircle />
            </span>
            <span className="font-semibold">Add Question</span>
          </button>
        </div>
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <Filteration
            config={searchFilterConfig}
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            getUniqueValues={getUniqueValues}
            totalItems={totalItems}
            totalData={data?.length}
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <QuestionTable
            Questions={Questions}
            isError={isError}
            isLoading={isLoading}
            handleEditQuestion={handleEditQuestion}
            handleViewQuestion={handleViewQuestion}
            handleViewDelete={handleViewDelete}
          />
          <QuestionGrid
            Questions={Questions}
            isError={isError}
            isLoading={isLoading}
            handleEditQuestion={handleEditQuestion}
            handleViewQuestion={handleViewQuestion}
            handleViewDelete={handleViewDelete}
          />
        </div>
      </div>
      {Questions?.length > 0 && (
        <Pagination
          data={filteredData?.length}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
      {isOpen("AddQuestion") && (
        <AddUpdateModal
          closeModal={closeModal}
          header={QuestionId ? "Updata Question" : "Create Question"}
          isOpen={isOpen("AddQuestion")}
        >
          <QuestionData
            key={QuestionId}
            onSuccess={handleFormSuccess}
            id={QuestionId}
          />
        </AddUpdateModal>
      )}
      {isOpen("DeleteQuestion") && (
        <DeleteConfirmation
          isOpen={isOpen("DeleteQuestion")}
          onClose={closeModal}
          onConfirm={() => handleDeleteQuestion(QuestionId)}
          status={status}
          HeadingMessage="Delete Question"
          Message={`Delete ${viewQuestion?.title}  Question `}
        />
      )}
      {isOpen("ViewQuestion") && (
        <ViewModal
          isOpen={isOpen("ViewQuestion")}
          onClose={closeModal}
          title="Question Details"
        >
          <QuestionView Question={viewQuestion} key={viewQuestion?._id} />
        </ViewModal>
      )}
    </>
  );
}
