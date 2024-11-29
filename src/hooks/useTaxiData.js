import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRouteData } from "../redux/actions/taxiAction";

export const useTaxiData = () => {
  const [taxiData, setTaxiDataState] = useState([]);
  const [totalRoute, setTotalRoute] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTaxiData = async () => {
      try {
        const response = await fetch(
          "https://data.cityofnewyork.us/resource/gkne-dk5s.json"
        );
        const data = await response.json();
        const limitedData = data.slice(0, 10);

        setTotalRoute(data.length);
        setTaxiDataState(limitedData);
        dispatch(setRouteData(limitedData));
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchTaxiData();
  }, [dispatch]);

  return { taxiData, totalRoute };
};
