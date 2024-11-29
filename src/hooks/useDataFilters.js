import { useState, useMemo } from "react";
import { format } from "date-fns";

export const useDataFilters = (taxiData) => {
  const [filters, setFilters] = useState({
    pickupDate: "2014-03-11",
    dropoffDate: "",
    fareAmount: [0, 100],
    tripDistance: [0, 20],
    paymentType: "",
  });

  const filteredData = useMemo(() => {
    return taxiData.filter((item) => {
      const pickupMatch = filters.pickupDate
        ? format(item.pickup_datetime, "yyyy-MM-dd") >= filters.pickupDate
        : true;
      const dropoffMatch = filters.dropoffDate
        ? format(item.dropoff_datetime, "yyyy-MM-dd") <= filters.dropoffDate
        : true;
      const fareMatch =
        item.fare_amount >= filters.fareAmount[0] &&
        item.fare_amount <= filters.fareAmount[1];
      const distanceMatch =
        item.trip_distance >= filters.tripDistance[0] &&
        item.trip_distance <= filters.tripDistance[1];
      const paymentMatch = filters.paymentType
        ? item.payment_type === filters.paymentType
        : true;

      return (
        pickupMatch &&
        dropoffMatch &&
        fareMatch &&
        distanceMatch &&
        paymentMatch
      );
    });
  }, [taxiData, filters]);

  return { filters, setFilters, filteredData };
};
