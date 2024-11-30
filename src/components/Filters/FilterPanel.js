import React from "react";
import DatePicker from "react-datepicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const FilterPanel = ({ filters, setFilters }) => {
  const handleFilterDate = (date, name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: date ? format(date, "yyyy-MM-dd") : "",
    }));
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;

    if (name == "fareAmount" || name == "tripDistance") {
      const [newMin, newMax] = value; 
      if (newMin > newMax) {
        setFilters((prev) => ({
          ...prev,
          [name]: [newMax, newMin],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div
      className="absolute lg:bottom-0 bg-emerald-700/30 text-white p-5"
      style={{ zIndex: 500 }}
    >
      <h2 className="text-white font-bold mb-4">
        <FilterAltIcon style={{ fontSize: 30, marginRight: 10 }} />
        Filter Trips
      </h2>

      {/* Pickup Date Filter */}
      <DateFilterSection
        label="Pickup"
        name="pickupDate"
        value={filters.pickupDate}
        onChange={(date) => handleFilterDate(date, "pickupDate")}
      />

      {/* Dropoff Date Filter */}
      <DateFilterSection
        label="Dropoff"
        name="dropoffDate"
        value={filters.dropoffDate}
        onChange={(date) => handleFilterDate(date, "dropoffDate")}
      />

      {/* Payment Types Filter */}
      <div className="my-3">
        <h3 className="text-white">Payment Types: </h3>
        <Select
          name="paymentType"
          value={filters.paymentType}
          onChange={handleFilter}
          sx={selectStyles}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="CRD">CRD</MenuItem>
          <MenuItem value="CSH">CSH</MenuItem>
        </Select>
      </div>

      {/* Fare Amount Slider */}
      <SliderFilter
        label="Fare Amount"
        name="fareAmount"
        value={filters.fareAmount}
        onChange={handleFilter}
        min={0}
        max={40}
      />

      {/* Trip Distance Slider */}
      <SliderFilter
        label="Trip Distance"
        name="tripDistance"
        value={filters.tripDistance}
        onChange={handleFilter}
        min={0}
        max={20}
      />
    </div>
  );
};

// Sub-components for better organization
const DateFilterSection = ({ label, name, value, onChange }) => (
  <div className="my-3">
    <h3 className="text-white">{label}: </h3>
    <DatePicker
      name={name}
      autoFocus={false}
      className="bg-transparent custom-datepicker"
      selected={value ? new Date(value) : null}
      placeholderText="MM/DD/YYYY"
      onChange={onChange}
    />
  </div>
);

const SliderFilter = ({ label, name, value, onChange, min, max }) => (
  <div className="my-3">
    <h3 className="text-white">{label}: </h3>
    <Slider
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      color="white"
      valueLabelDisplay="auto"
      step={0.01}
    />
  </div>
);

// Styles for Select component
const selectStyles = {
  width: "100%",
  height: "30px",
  color: "white",
  fill: "white",
  stroke: "white",
  "& .MuiInputBase-input": { padding: 0 },
  "& .MuiSelect-root": { border: "none" },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
};

export default FilterPanel;
