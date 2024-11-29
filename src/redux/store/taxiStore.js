// Set up the Redux store

import { createStore } from "redux";
import routeReducer from "../reducer/taxiReducer";

const store = createStore(routeReducer);

export default store;
