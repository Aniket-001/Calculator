import { configureStore } from "@reduxjs/toolkit";
import calcReducer from "../slices/calcReducer";

const store = configureStore({
    reducer: calcReducer 
}) 

export default store;