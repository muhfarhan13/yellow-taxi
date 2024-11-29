export const processPaymentTypes = (taxiData) => {
  const groupedData = taxiData.reduce((acc, item) => {
    acc[item.payment_type] = (acc[item.payment_type] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(groupedData).map(([key, value], index) => ({
    id: index,
    value,
    label: key,
    color: index === 0 ? "#FF6F61" : "#007B83",
  }));
};

export const calculateAverageDistance = (taxiData) => {
  const totalDistance = taxiData.reduce(
    (acc, trip) => acc + parseFloat(trip.trip_distance),
    0
  );
  return (totalDistance / taxiData.length).toFixed(2);
};

export const calculateAverageFare = (taxiData) => {
  const totalFare = taxiData.reduce(
    (total, item) => total + parseFloat(item.fare_amount),
    0
  );
  return (totalFare / taxiData.length).toFixed(2);
};

export const calculateVendorTransactions = (taxiData) => {
  const vendorCounts = taxiData.reduce((acc, { vendor_id }) => {
    acc[vendor_id] = (acc[vendor_id] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(vendorCounts).map(([vendor, count], index) => ({
    id: index,
    value: count,
    label: vendor,
    color: index === 0 ? "#FBB13C" : "#3D348B",
  }));
};
