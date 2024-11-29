import React from "react";
import MapView from "../components/MapView/MapView";
import FilterPanel from "../components/Filters/FilterPanel";
import DashboardStats from "../components/DashboardStats";
import { useTaxiData } from "../hooks/useTaxiData";
import { useDataFilters } from "../hooks/useDataFilters";

const HomeScreen = () => {
  const { taxiData, totalRoute } = useTaxiData();
  const { filters, setFilters, filteredData } = useDataFilters(taxiData);

  return (
    <div className="h-screen lg:flex w-full">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <MapView taxiData={filteredData} />
      <DashboardStats totalRoute={totalRoute} taxiData={filteredData} />
    </div>
  );
};

export default HomeScreen;
