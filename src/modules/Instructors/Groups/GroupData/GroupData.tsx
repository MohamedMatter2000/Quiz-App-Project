import { useEffect } from "react";
import Select from "react-select";
import {
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useGetStudentsWithoutGroupQuery,
  useUpdateGroupMutation,
} from "../../../../Store/ApiStore/Api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInputCrud from "../../../Shared/FormInput/FormInputCrud";
import { getValidationRules } from "../../../../hook/usevalidations";
import { GroupFormData, SelectOption } from "../../../../interfaces/Group";
import { Student } from "../../../../interfaces/dashboard";

const GroupData = ({
  onSuccess,
  id,
}: {
  onSuccess: () => void;
  id: string | null;
}) => {
  const isEditing = Boolean(id);
  const { data: studentsWithoutGroup, isLoading: isStudentsLoading } =
    useGetStudentsWithoutGroupQuery({});
  const [createGroup, { isLoading: isCreate }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: isUpdate }] = useUpdateGroupMutation();
  const { data: selectedGroup, isLoading: isGet } = useGetGroupByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !isEditing,
  });
  const { NameGroup, StudentsGroup } = getValidationRules();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GroupFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      students: [],
    },
  });
  const selectedStudents = watch("students");
  const studentOptions = studentsWithoutGroup
    ? studentsWithoutGroup.map((student: Student) => ({
        value: student._id,
        label: `${student.first_name}${student.last_name}`,
      }))
    : [];
  useEffect(() => {
    if (isEditing && selectedGroup) {
      setValue("name", selectedGroup.name, { shouldValidate: true });
      const formattedStudents: SelectOption[] =
        selectedGroup.students?.map((student: Student) => ({
          value: student._id,
          label: `${student.first_name}${student.last_name}`,
        })) || [];
      setValue("students", formattedStudents, { shouldValidate: true });
    }
  }, [isEditing, selectedGroup, setValue]);
  const onSubmit = async (data: GroupFormData): Promise<void> => {
    try {
      const formatdata = {
        name: data.name,
        students: data.students.map((student) => student.value),
      };
      if (isEditing) {
        const response = await updateGroup({ id, data: formatdata }).unwrap();
        toast.success(response.message);
      } else {
        const response = await createGroup(formatdata).unwrap();
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      reset();
      if (onSuccess) onSuccess();
    }
  };
  return (
    <form
      id="modal-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {isCreate || isUpdate || isGet ? (
        <div className="flex items-center justify-center">
          <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-800"></div>
          <h1 className="text-lg font-medium text-gray-600">
            {isCreate
              ? "Creating Group"
              : isUpdate
              ? "Updating Group"
              : isGet
              ? "Geting Group"
              : "Fetching"}
          </h1>
        </div>
      ) : (
        <>
          <div>
            <FormInputCrud
              type="text"
              label="Group Name"
              name="name"
              register={register}
              rules={NameGroup}
              placeholder="Enter Name Group"
              error={errors?.name}
            />
          </div>
          <div>
            <h2>Select Students</h2>
            <Controller
              name="students"
              control={control}
              rules={StudentsGroup}
              render={({ field }) => (
                <Select
                  isMulti
                  isLoading={isStudentsLoading}
                  options={studentOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected || [])}
                  placeholder="Select students..."
                />
              )}
            />
            {errors.students && (
              <p className="mt-1 text-sm text-red-500">
                {errors.students.message}
              </p>
            )}
            <h3>Selected Students:</h3>
            <ul>
              {selectedStudents?.length > 0 &&
                selectedStudents.map((student) => student.label).join(", ")}
            </ul>
          </div>
        </>
      )}
    </form>
  );
};

export default GroupData;
