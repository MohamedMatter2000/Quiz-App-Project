import { ArrowRight } from "lucide-react";
interface Student {
  first_name: string;
  last_name: string;
  avg_score: number;
  group: {
    name: string;
  };
}
interface StudentCardProps {
  Student: Student;
  onView: (student: Student) => void;
}
export const StudentCard = ({ Student, onView }: StudentCardProps) => {
  if (!Student) return null;
  const name = `${Student.first_name} ${Student.last_name}`;
  const avgScore = Math.round(Student.avg_score) || Student.avg_score;
  return (
    <div className="flex items-center p-3 hover:bg-gray-50">
      <img
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
        alt={name}
        className="h-10 w-10 rounded-full"
      />
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <div className="text-xs text-gray-500">
          Class rank: {Student.group.name} | Average score: {avgScore}%
        </div>
      </div>
      <button
        onClick={() => onView(Student)}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full bg-black text-center text-sm text-white hover:text-gray-200"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
