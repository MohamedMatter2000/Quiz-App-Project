import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  QuestionId: null,
};
const QuestionSlice = createSlice({
  name: "Question",
  initialState,
  reducers: {
    EditingQuestionId: (state, action) => {
      state.QuestionId = action.payload;
    },
    RemoveQuestionId: (state) => {
      state.QuestionId = null;
    },
  },
});
export const { EditingQuestionId, RemoveQuestionId } = QuestionSlice.actions;
export default QuestionSlice.reducer;
