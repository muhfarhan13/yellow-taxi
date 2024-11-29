import React from "react";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScatterChart } from "@mui/x-charts";

import {
  processPaymentTypes,
  calculateVendorTransactions,
  calculateAverageDistance,
  calculateAverageFare,
} from "../utils/dataProcessing";

const DashboardStats = ({ totalRoute, taxiData }) => {
  const paymentTypes = processPaymentTypes(taxiData);
  const vendorTransactions = calculateVendorTransactions(taxiData);
  const averageDistance = calculateAverageDistance(taxiData);
  const averageFareAmount = calculateAverageFare(taxiData);

  return (
    <div
      className="text-white pt-8 bg-emerald-700 lg:bg-transparent 
      lg:bg-gradient-to-r w-full lg:w-auto 
      lg:from-emerald-700/75 px-6 h-screen overflow-auto absolute right-0"
      style={{ zIndex: 1000 }}
    >
      <div>
        {/* Route Summary */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-md uppercase text-xl">Route line taxi 2014</h1>
            <h1 className="text-2xl font-bold">{totalRoute ?? "1000"}</h1>
          </div>
          <div>
            <LocalTaxiOutlinedIcon
              style={{ color: "rgb(251, 177, 60)", fontSize: 40 }}
            />
          </div>
        </div>

        {/* Average Travel Stats */}
        <div className="flex my-8 justify-between">
          <div className="border-l-4 bg-white/5 ps-4">
            <h2 className="uppercase">average travel distance</h2>
            <h1 className="uppercase text-4xl font-bold">
              {averageDistance} mil
            </h1>
          </div>
          <div className="border-l-4 bg-white/5 ps-4 pe-7">
            <h2 className="uppercase">average fare amount</h2>
            <h1 className="uppercase text-4xl font-bold">
              {averageFareAmount} USD
            </h1>
          </div>
        </div>

        {/* Fare vs Distance Scatter Chart */}
        <h1>Rates Based on Distance and Time</h1>
        <div className="bg-white/75 rounded-xl">
          <ScatterChart
            width={600}
            height={300}
            series={[
              {
                label: "Fare vs Distance",
                data: taxiData.map((v, i) => ({
                  x: parseFloat(v.trip_distance),
                  y: parseFloat(v.fare_amount),
                  key: i,
                  id: i
                })),
              },
            ]}
            xAxis={[{ label: "Distance" }]}
            yAxis={[{ label: "Fare" }]}
          />
        </div>

        {/* Payment Type and Vendor Transaction Charts */}
        <div className="flex mt-4 pie-chart">
          <PaymentTypeChart paymentTypes={paymentTypes} />
          <VendorTransactionChart vendorTransactions={vendorTransactions} />
        </div>
      </div>
    </div>
  );
};

// Sub-components extracted for clarity
const PaymentTypeChart = ({ paymentTypes }) => (
  <div>
    <h1 className="text-start uppercase">Payment Type</h1>
    <PieChart
      series={[
        {
          data: paymentTypes,
          innerRadius: 80,
          outerRadius: 40,
          paddingAngle: 10,
          cornerRadius: 10,
          startAngle: -90,
          highlightScope: { fade: "global", highlight: "item" },
          faded: {
            innerRadius: 30,
            additionalRadius: -30,
            color: "gray",
          },
        },
      ]}
      width={300}
      height={200}
    />
  </div>
);

const VendorTransactionChart = ({ vendorTransactions }) => (
  <div>
    <h1 className="text-start uppercase">Number Transactions Vendor</h1>
    <PieChart
      series={[
        {
          data: vendorTransactions,
          innerRadius: 80,
          outerRadius: 40,
          paddingAngle: 10,
          cornerRadius: 10,
          startAngle: -45,
          highlightScope: { fade: "global", highlight: "item" },
          faded: {
            innerRadius: 30,
            additionalRadius: -30,
            color: "gray",
          },
        },
      ]}
      width={300}
      height={200}
    />
  </div>
);

export default DashboardStats;
