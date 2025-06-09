import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../ApiStore/Api";
import authReducer from "../AuthanticationSlice/AuthSlice";
import QuestionReducer from "../QuestionSlice/QuestionSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    Question: QuestionReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});
setupListeners(store.dispatch);
