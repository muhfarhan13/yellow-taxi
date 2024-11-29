// Define action types and action creators

export const SET_ROUTE_DATA = "SET_ROUTE_DATA";

export const setRouteData = (data) => ({
  type: SET_ROUTE_DATA,
  payload: data,
});
