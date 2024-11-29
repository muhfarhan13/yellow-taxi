import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import HomeScreens from "./screens/HomeScreens";
import store from "./redux/store/taxiStore"; // Import the store

function App() {
  return (
    <Provider store={store}>
      <HomeScreens />
    </Provider>
  );
}

export default App;
