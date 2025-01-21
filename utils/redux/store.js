import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
// import { authApi } from "./Api/auth.api";

export default configureStore({
  reducer: {
    ...rootReducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
});

// Infer the type of makeStore
