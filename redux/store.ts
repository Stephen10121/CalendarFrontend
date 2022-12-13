import { createStore } from "redux";
import userReducer from "./reducers";

export const Store = createStore(userReducer);
