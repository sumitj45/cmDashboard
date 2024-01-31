import axios from "axios";
import React, { useState } from "react";
import "./RegionFilter.css"; // Import the CSS file

const RegionFilter = ({ onFilterApply }) => {
  const [selectedGeoIds, setSelectedGeoIds] = useState([]);

  const handleCheckboxChange = (event) => {
    const geoName = event.target.value;
    setSelectedGeoIds((prevGeoIds) =>
      prevGeoIds.includes(geoName) ? prevGeoIds.filter((id) => id !== geoName) : [...prevGeoIds, geoName]
    );
  };

  const handleApplyFilter = async () => {
    try {
      const response = await axios.get("http://localhost:8083/api/contract-details");
      const filteredData = response.data.filter((contract) => selectedGeoIds.includes(contract[2]));
      onFilterApply(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="filter-card">
      <h4>Filter by Geo</h4>
      <div className="checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="IND"
            checked={selectedGeoIds.includes("IND")}
            onChange={handleCheckboxChange}
          />
          IND
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="USA"
            checked={selectedGeoIds.includes("USA")}
            onChange={handleCheckboxChange}
          />
          USA
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="UK"
            checked={selectedGeoIds.includes("UK")}
            onChange={handleCheckboxChange}
          />
          UK
        </label>
        {/* Add more checkboxes as needed */}
      </div>
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default RegionFilter;
