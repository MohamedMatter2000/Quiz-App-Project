import { useEffect, useRef } from "react";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import useModal from "../../../../hook/useModal";
import DropdownMenu from "./DropdownMenu";

export default function StudentCard({
  student,
  cardStyle,
  onView,
  onDelete,
  onRemoveFromGroup,
}) {
  const { isOpen, toggleModal, closeModal } = useModal();
  const dropdownRef = useRef(null);
  const dropdownModalId = `dropdown-${student?.id}`;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);
  const toggleDropdown = () => {
    toggleModal(dropdownModalId);
  };
  function studentstyle(student) {
    const styles = [
      "adventurer",
      "adventurer-neutral",
      "avataaars",
      "big-ears",
      "bottts",
      "croodles",
      "icons",
      "identicon",
      "lorelei",
      "micah",
      "miniavs",
      "open-peeps",
      "personas",
      "pixel-art",
      "thumbs",
    ];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const name = `${student.first_name} ${student.last_name}`;
    if (cardStyle === "grid") {
      return (
        <div className="relative" ref={dropdownRef}>
          <div className="relative flex w-full flex-col items-center rounded-xl bg-white p-6 text-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="absolute right-3 top-3 flex place-items-end gap-2">
              <button
                onClick={toggleDropdown}
                className={`flex size-5 cursor-pointer items-center justify-center rounded-full bg-black text-center text-sm text-white transition-transform duration-200 hover:text-gray-200 ${
                  isOpen(dropdownModalId) ? "rotate-90" : ""
                }`}
              >
                <ArrowRight />
              </button>
            </div>
            <img
              className="mb-4 h-28 w-28 rounded-full border-4 border-gray-200 object-cover shadow-md"
              src={`https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${student.first_name}`}
              alt={student.first_name}
            />
            <h5 className="mb-1 text-2xl font-semibold text-gray-900">
              {student.first_name} {student.last_name}
            </h5>
            <p className="mb-1 text-sm text-gray-700 opacity-80">
              Group: {student.group?.name || "No Group"}
            </p>
            <p
              className={`flex items-center text-sm ${
                student.status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {student.status}
              {student.status === "active" ? (
                <CheckCircle className="ml-1" />
              ) : (
                <XCircle className="ml-1" />
              )}
            </p>
          </div>
          {/* Dropdown Menu */}
          <DropdownMenu
            student={student}
            isOpen={isOpen(dropdownModalId)}
            onClose={toggleDropdown}
            onView={onView}
            onDelete={onDelete}
            onRemoveFromGroup={onRemoveFromGroup}
          />
        </div>
      );
    } else {
      return (
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <img
              src={`https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${name}`}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <h4 className="text-base font-semibold">{name}</h4>
              <p className="text-sm text-gray-600">
                Group: {student.group?.name || "No Group"}
              </p>
              <p className="flex items-center text-sm text-green-500">
                active
                <CheckCircle className="ml-2" />
              </p>
            </div>
            <button
              onClick={toggleDropdown}
              className={`flex size-5 cursor-pointer items-center justify-center rounded-full bg-black text-center text-sm text-white transition-transform duration-200 hover:text-gray-200 ${
                isOpen(dropdownModalId) ? "rotate-90" : ""
              }`}
            >
              <ArrowRight />
            </button>
          </div>
          <DropdownMenu
            student={student}
            isOpen={isOpen(dropdownModalId)}
            onClose={toggleDropdown}
            onView={onView}
            onDelete={onDelete}
            onRemoveFromGroup={onRemoveFromGroup}
          />
        </div>
      );
    }
  }
  return studentstyle(student);
}
