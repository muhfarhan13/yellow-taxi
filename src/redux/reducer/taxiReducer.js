// Define initial state and reducer function

import { SET_ROUTE_DATA } from "../actions/taxiAction";

const initialState = {
  routeData: [],
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTE_DATA:
      return {
        ...state,
        routeData: action.payload,
      };
    default:
      return state;
  }
};

export default routeReducer;
