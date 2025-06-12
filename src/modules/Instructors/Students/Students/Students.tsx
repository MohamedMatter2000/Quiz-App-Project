import { useState } from "react";
import {
  useDeleteStudentFromGroupMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../../../../Store/ApiStore/Api";
import StudentCard from "./StudentCard";
import Pagination from "../../../Shared/Pagination/Pagination";
import ViewModal from "../../../Shared/ViewModal/ViewModal";
import StudentView from "../StudentView/StudentView";
import useModal from "../../../../hook/useModal";
import DeleteConfirmation from "../../../Shared/DelecteConfirmation/DelecteConfirmation";
import { useEffect } from "react";
import StudentControl from "./StudentControl";
import PreLoader from "../../../Shared/PreLoader/PreLoader";
import NotFound from "../../../Shared/NotFound/NotFound";
import ErrorLoading from "../../../Shared/ErrorLoading/ErrorLoading";
import Filteration from "../../../Shared/Filteration/Filteration";
import { useFilter } from "../../../../hook/useFilter";
export default function Students() {
  const { data: AllStudents, isLoading, isError } = useGetStudentsQuery({});
  const [deleteStudent, { status, reset }] = useDeleteStudentMutation();
  const [
    deleteStudentFromGroup,
    { status: groupDeleteStatus, reset: resetGroupDelete },
  ] = useDeleteStudentFromGroupMutation();
  const { isOpen, closeModal, openModal } = useModal();
  const [columns, setColumns] = useState(3);
  const [cardStyle, setCardStyle] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);
  const [selectedStudentid, setSelectedStudentid] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const viewstuent = AllStudents?.filter(
    (item) => item?._id === selectedStudentid
  )[0];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setColumns(1);
      } else if (window.innerWidth <= 992) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      default:
        return "grid-cols-3";
    }
  };
  const searchFilterConfig = {
    filters: [
      {
        key: "Name",
        type: "search",
        label: "Search by Name",
        placeholder: "Search Student...",
        filterFunction: (item, value) =>
          `${item.first_name} ${item.last_name}`
            .toLowerCase()
            .includes(value.toLowerCase()),
      },
    ],
  };
  const { filters, filteredData, updateFilter, clearFilters, totalItems } =
    useFilter(AllStudents, searchFilterConfig);
  const handleDeleteStudent = async (studentId) => {
    await deleteStudent(studentId).unwrap();
  };
  const handleDeleteStudentFromGroup = async (studentId, groupId) => {
    await deleteStudentFromGroup({ studentId, groupId }).unwrap();
  };
  const handleViewDelete = (id) => {
    openModal("DeleteStudent");
    setSelectedStudentid(id);
    reset();
  };
  const handleViewDeleteFromGroup = (studentId, groupId) => {
    openModal("DeleteStudentFromGroup");
    setSelectedStudentid(studentId);
    setSelectedGroupId(groupId);
    resetGroupDelete();
  };
  const handleViewStuddent = (studentId) => {
    openModal("ViewStudent");
    setSelectedStudentid(studentId);
  };
  const close = () => {
    setSelectedStudentid(null);
    setSelectedGroupId(null);
    closeModal();
  };

  const StudentScreen = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="my-7 flex items-center gap-4 max-lg:flex-col max-lg:items-start max-md:my-4">
        <div className="w-full flex-1">
          <Filteration
            config={searchFilterConfig}
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            totalItems={totalItems}
            totalData={AllStudents?.length}
          />
        </div>
        <StudentControl
          setitemsPerPage={setitemsPerPage}
          itemsPerPage={itemsPerPage}
          setCardStyle={setCardStyle}
          cardStyle={cardStyle}
          columns={columns}
          setColumns={setColumns}
        />
      </div>
      {isLoading ? (
        <PreLoader />
      ) : isError ? (
        <ErrorLoading message={"students"} />
      ) : !StudentScreen || StudentScreen.length === 0 ? (
        <NotFound message={"students"} />
      ) : (
        <div className={`grid ${getGridClass()} gap-4`}>
          {StudentScreen?.map((student) => {
            return (
              <StudentCard
                student={student}
                key={student._id}
                cardStyle={cardStyle}
                onView={(StudentId) => handleViewStuddent(StudentId)}
                onDelete={(StudentId) => handleViewDelete(StudentId)}
                onRemoveFromGroup={(StudentId, StudentGroup) =>
                  handleViewDeleteFromGroup(StudentId, StudentGroup)
                }
              />
            );
          })}
        </div>
      )}
      {filteredData?.length > 0 && (
        <Pagination
          data={filteredData?.length}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
      {isOpen("ViewStudent") && selectedStudentid && (
        <ViewModal
          isOpen={isOpen("ViewStudent")}
          onClose={close}
          title={"Student Details"}
          size="lg"
        >
          <StudentView studentData={viewstuent} show={false} />
        </ViewModal>
      )}
      {isOpen("DeleteStudent") && selectedStudentid && (
        <DeleteConfirmation
          isOpen={isOpen("DeleteStudent")}
          onClose={close}
          onConfirm={() => handleDeleteStudent(selectedStudentid)}
          status={status}
          HeadingMessage="Delete Student"
          Message={`Delete ${viewstuent?.first_name} ${viewstuent?.last_name}  Student `}
        />
      )}
      {isOpen("DeleteStudentFromGroup") &&
        selectedStudentid &&
        selectedGroupId && (
          <DeleteConfirmation
            isOpen={isOpen("DeleteStudentFromGroup")}
            onClose={close}
            onConfirm={() =>
              handleDeleteStudentFromGroup(selectedStudentid, selectedGroupId)
            }
            status={groupDeleteStatus}
            HeadingMessage="Remove Student from Group"
            Message={`Remove ${viewstuent?.first_name} ${viewstuent?.last_name} from ${viewstuent.group?.name} group`}
          />
        )}
    </>
  );
}
