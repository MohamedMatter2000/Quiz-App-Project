import { User, Mail, Users, Award, Shield } from "lucide-react";
export default function StudentView({
  studentData,
  show = true,
}: {
  studentData: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    status: string;
    avg_score: number;
    group: {
      name: string;
    };
  };
  show?: boolean;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };
  const getStatusColor = (status: string) => {
    return status === "active"
      ? "text-green-600 bg-green-100"
      : "text-gray-600 bg-gray-100";
  };
  return (
    <div className="space-y-6 p-6">
      {/* Personal Information */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
          <User className="mr-2" size={20} />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <p className="font-medium capitalize text-gray-800">
              {studentData.first_name} {studentData.last_name}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="flex items-center text-gray-800">
              <Mail className="mr-2" size={16} />
              {studentData.email}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Student ID
            </label>
            <p className="font-mono text-gray-800">{studentData._id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <p className="flex items-center text-gray-800">
              <Shield className="mr-2" size={16} />
              {studentData.role}
            </p>
          </div>
        </div>
      </div>
      {/* Academic Performance */}
      {show && (
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
            <Award className="mr-2" size={20} />
            Academic Performance
          </h3>
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Average Score
              </label>
              <div className="mt-1 flex items-center">
                <span
                  className={`rounded-full px-3 py-1 text-lg font-bold ${getScoreColor(
                    Math.trunc(studentData.avg_score)
                  )}`}
                >
                  {Math.trunc(studentData.avg_score)}/100
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <div className="mt-1 flex items-center">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(
                    studentData.status
                  )}`}
                >
                  {studentData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Group Information */}
      <div className="rounded-lg bg-green-50 p-4">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
          <Users className="mr-2" size={20} />
          Group Information
        </h3>
        {studentData?.group?.name ? (
          <div>
            <label className="text-sm font-medium text-gray-600">
              Group Name
            </label>
            <p className="font-medium text-gray-800">
              {studentData?.group?.name}
            </p>
          </div>
        ) : (
          <h2>This Student Out Any Group</h2>
        )}
      </div>
    </div>
  );
}
