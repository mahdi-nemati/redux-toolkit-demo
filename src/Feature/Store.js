import { configureStore } from "@reduxjs/toolkit";
import ContactSlice from "./AsyncToolkit/ContactSlice";

const store = configureStore({
  reducer: {
    contact: ContactSlice,
  },
});
export default store;
