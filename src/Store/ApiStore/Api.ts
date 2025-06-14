import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  ForgetPassData,
  ResetData,
  ChangeData,
} from "../../interfaces/authInterfaces";
import { Question } from "../../interfaces/Question";
import { Quiz } from "../../interfaces/Quiz";
import { Student } from "../../interfaces/dashboard";
import { Group } from "../../interfaces/Group";
export const ApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3005/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Group", "Student", "Question", "Quiz", "QuizResult"],
  endpoints: (builder) => ({
    // Auth API
    login: builder.mutation<AuthResponse, LoginData>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<AuthResponse, ForgetPassData>({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetData>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<AuthResponse, ChangeData>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // Questions API
    getQuestions: builder.query<Question[], void>({
      query: () => "/question",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Question" as const,
                id: _id,
              })),
              { type: "Question" as const, id: "LIST" },
            ]
          : [{ type: "Question" as const, id: "LIST" }],
    }),
    getQuestionById: builder.query({
      query: (id) => `/question/${id}`,
      providesTags: (result, error, id) => [{ type: "Question", id }],
    }),
    createQuestion: builder.mutation({
      query: (questionData) => ({
        url: "/question",
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/question/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),
    searchQuestions: builder.query({
      query: (params) => ({
        url: "/question/search",
        params,
      }),
      providesTags: [{ type: "Question", id: "SEARCH" }],
    }),

    // Groups API
    GetGroups: builder.query<Group[], void>({
      query: () => "/group",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Group" as const, id: _id })),
              { type: "Group" as const, id: "LIST" },
            ]
          : [{ type: "Group" as const, id: "LIST" }],
    }),
    getGroupById: builder.query({
      query: (id) => `/group/${id}`,
      providesTags: (id) => [{ type: "Group", id }],
    }),
    createGroup: builder.mutation({
      query: (groupdata) => ({
        url: "/group",
        method: "POST",
        body: groupdata,
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }, "Student"],
    }),
    updateGroup: builder.mutation({
      query: ({ id, data }) => ({
        url: `/group/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ({ id }) => [
        { type: "Group", id },
        { type: "Group", id: "LIST" },
        "Student",
      ],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [
        { type: "Group", id },
        { type: "Group", id: "LIST" },
        "Student",
      ],
    }),

    // Students API
    getStudents: builder.query<Student[], void>({
      query: () => "/student",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Student" as const,
                id: _id,
              })),
              { type: "Student" as const, id: "LIST" },
            ]
          : [{ type: "Student" as const, id: "LIST" }],
    }),
    getStudentsWithoutGroup: builder.query({
      query: () => "/student/without-group",
      providesTags: ["Student"],
    }),
    getStudentById: builder.query({
      query: (id) => `/student/${id}`,
      providesTags: (id) => [{ type: "Student", id }],
    }),
    getTopFiveStudents: builder.query({
      query: () => "/student/top-five",
      providesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
        "Student",
        "Group",
      ],
    }),
    addStudentToGroup: builder.mutation({
      query: ({ studentId, groupId }) => ({
        url: `/student/${studentId}/${groupId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { studentId, groupId }) => [
        { type: "Student", id: studentId },
        { type: "Group", id: groupId },
        "Student",
        "Group",
      ],
    }),
    deleteStudentFromGroup: builder.mutation({
      query: ({ studentId, groupId }) => ({
        url: `/student/${studentId}/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { studentId, groupId }) => [
        { type: "Student", id: studentId },
        { type: "Group", id: groupId },
        "Student",
        "Group",
      ],
    }),
    updateStudentGroup: builder.mutation({
      query: ({ studentId, groupId }) => ({
        url: `/student/${studentId}/${groupId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { studentId, groupId }) => [
        { type: "Student", id: studentId },
        { type: "Group", id: groupId },
        "Student",
        "Group",
      ],
    }),

    // Quiz API
    getAllQuizzes: builder.query<Quiz[], void>({
      query: () => "/quiz",
      providesTags: ["Quiz"],
    }),
    getQuizById: builder.query<Quiz, string>({
      query: (id) => `/quiz/${id}`,
      providesTags: (result, error, id) => [{ type: "Quiz", id }],
    }),
    createQuiz: builder.mutation({
      query: (newQuiz) => ({
        url: "/quiz",
        method: "POST",
        body: newQuiz,
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }, "Quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quiz/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Quiz", id }],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }, "Quiz"],
    }),
    joinQuiz: builder.mutation({
      query: (joinData) => ({
        url: "/quiz/join",
        method: "POST",
        body: joinData,
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitQuiz: builder.mutation({
      query: ({ id, answers }) => ({
        url: `/quiz/submit/${id}`,
        method: "POST",
        body: answers,
      }),
      invalidatesTags: [{ type: "QuizResult", id: "LIST" }, "Quiz"],
    }),
    getQuizQuestionsWithoutAnswers: builder.query({
      query: (id) => `/quiz/without-answers/${id}`,
    }),
    getAllQuizResults: builder.query({
      query: () => "/quiz/result",
      providesTags: ["QuizResult"],
    }),
    getFirstFiveIncomingQuizzes: builder.query({
      query: () => "/quiz/incomming",
      providesTags: ["Quiz"],
    }),
    getLastFiveCompletedQuizzes: builder.query({
      query: () => "/quiz/completed",
      providesTags: ["Quiz"],
    }),
    reassignQuiz: builder.mutation({
      query: (id) => ({
        url: `/quiz/reassign/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  // Auth hooks
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  // Questions hooks
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useSearchQuestionsQuery,
  // Group hooks
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useGetGroupByIdQuery,
  useGetGroupsQuery,
  // Students hooks
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetStudentsWithoutGroupQuery,
  useGetTopFiveStudentsQuery,
  useAddStudentToGroupMutation,
  useUpdateStudentGroupMutation,
  useDeleteStudentFromGroupMutation,
  useDeleteStudentMutation,
  // Quiz hooks
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useJoinQuizMutation,
  useSubmitQuizMutation,
  useGetQuizQuestionsWithoutAnswersQuery,
  useGetAllQuizResultsQuery,
  useGetFirstFiveIncomingQuizzesQuery,
  useGetLastFiveCompletedQuizzesQuery,
  useReassignQuizMutation,
} = ApiSlice;
