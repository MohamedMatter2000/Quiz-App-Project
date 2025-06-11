import {
  Edit,
  Trash2,
  Users,
  User,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import useModal from "../../../../hook/useModal";
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
} from "../../../../Store/ApiStore/Api";
import AddUpdateModal from "../../../Shared/Add-Update-Modal/AddUpdateModal";
import GroupData from "../GroupData/GroupData";
import DeleteConfirmation from "../../../Shared/DelecteConfirmation/DelecteConfirmation";
import PreLoader from "../../../Shared/PreLoader/PreLoader";
import ErrorLoading from "../../../Shared/ErrorLoading/ErrorLoading";
import NotFound from "../../../Shared/NotFound/NotFound";
import { Group } from "../../../../interfaces/Group";
export default function GroupList() {
  const { data: Groups, isLoading, isError } = useGetGroupsQuery({});
  const { isOpen, closeModal, openModal } = useModal();
  const [GroupId, setGroupId] = useState<string | null>(null);
  const [deleteGroup, { status, reset }] = useDeleteGroupMutation();
  const viewGroup: Group | undefined = Groups?.filter(
    (item: Group | undefined) => item?._id === GroupId
  )[0];
  console.log("viewGroup", viewGroup);
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const handleEdit = (GroupId: string): void => {
    setGroupId(GroupId);
    openModal("AddGroup");
  };
  const handleFormSuccess = () => {
    setGroupId(null);
    closeModal();
  };
  const handleDeleteGroup = async (id: string): Promise<void> => {
    await deleteGroup(id).unwrap();
  };
  const handleAddNew = () => {
    setGroupId(null);
    openModal("AddGroup");
  };
  const handleViewDelete = (GroupId: string): void => {
    setGroupId(GroupId);
    reset();
    openModal("DeleteGroup");
  };
  const close = () => {
    setGroupId(null);
    closeModal();
  };
  return (
    <>
      <div>
        <div className="flex justify-end">
          <button
            onClick={handleAddNew}
            className="group flex transform items-center rounded-full bg-gradient-to-r from-slate-700 to-gray-800 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:from-slate-600 hover:to-gray-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500"
          >
            <span className="mr-3 text-xl transition-transform duration-300 group-hover:rotate-90">
              <PlusCircle />
            </span>
            <span className="font-semibold">Add Group</span>
          </button>
        </div>
        {isLoading ? (
          <PreLoader />
        ) : isError ? (
          <ErrorLoading message={"Group"} />
        ) : !Groups || Groups.length === 0 ? (
          <NotFound message={"Group"} />
        ) : (
          <div className="my-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Groups?.map((group: Group) => (
              <div
                key={group._id}
                className="rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="border-b border-gray-100 p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold uppercase tracking-wide text-gray-800">
                      {group.name}
                    </h3>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                        group.status
                      )}`}
                    >
                      <CheckCircle className="mr-1 inline h-3 w-3" />
                      {group.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <User className="mr-3 h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        <span className="font-medium">Instructor:</span>
                        {group.instructor}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="mr-3 h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        <span className="font-medium">Students:</span>{" "}
                        {group.students.length} / {group.max_students}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                        style={{
                          width: `${
                            (group.students.length / group.max_students) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500">
                      {Math.round(
                        (group.students.length / group.max_students) * 100
                      )}
                      % filled
                    </p>
                  </div>
                </div>
                <div className="rounded-b-lg border-t border-gray-100 bg-gray-50 px-6 py-4">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(group._id)}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-800"
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleViewDelete(group._id)}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-800"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen("AddGroup") && (
        <AddUpdateModal
          closeModal={close}
          header={GroupId ? "Updata Group" : "Create Group"}
          isOpen={isOpen("AddGroup")}
          size="2xl"
        >
          <GroupData key={GroupId} onSuccess={handleFormSuccess} id={GroupId} />
        </AddUpdateModal>
      )}
      {isOpen("DeleteGroup") && GroupId && (
        <DeleteConfirmation
          isOpen={isOpen("DeleteGroup")}
          onClose={close}
          onConfirm={() => handleDeleteGroup(GroupId)}
          status={status}
          HeadingMessage="Delete Group"
          Message={`Delete ${viewGroup?.name}  Group `}
        />
      )}
    </>
  );
}
