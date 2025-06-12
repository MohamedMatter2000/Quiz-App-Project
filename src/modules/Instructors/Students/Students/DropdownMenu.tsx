export default function DropdownMenu({
  student,
  isOpen,
  onClose,
  onView,
  onDelete,
  onRemoveFromGroup,
}) {
  if (!isOpen) return null;
  const handleViewDetails = () => {
    onView?.(student?._id);
    onClose();
  };
  const handleDelete = () => {
    onDelete?.(student?._id);
    onClose();
  };
  const handleDeleteStudentfromGroup = () => {
    onRemoveFromGroup?.(student?._id, student.group?._id);
    onClose();
  };
  return (
    <div
      className={`absolute right-0 ${"top-12"} z-10 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-xl`}
    >
      <div className="py-2">
        <button
          onClick={handleViewDetails}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50"
        >
          View Details
        </button>
        <hr className="my-1 border-gray-100" />
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
        >
          DeleteStudent
        </button>
        {student.group?._id && (
          <>
            <hr className="my-1 border-gray-100" />
            <button
              onClick={handleDeleteStudentfromGroup}
              className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
            >
              RemoveFromGroup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
