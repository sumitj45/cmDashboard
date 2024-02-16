import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

const RegionFilter = ({ onFilterApply }) => {
  const [selectedGeoIds, setSelectedGeoIds] = useState([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const handleCheckboxChange = (event) => {
    const geoName = event.target.value;
    setSelectedGeoIds((prevGeoIds) =>
      prevGeoIds.includes(geoName)
        ? prevGeoIds.filter((id) => id !== geoName)
        : [...prevGeoIds, geoName]
    );
  };

  const handleApplyFilter = async () => {
    try {
      console.log("filter is applied");
      const response = await axios.get("http://localhost:8080/api/contract-details");
      const filteredData = response.data.filter((contract) =>
        selectedGeoIds.includes(contract[2])
      );
      onFilterApply(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <div className={`filter-card p-9 fixed bottom-16 left-0 bg-white border rounded-md shadow-sm overflow-y-auto max-h-96`}>
      <div className="filter-toggle" onClick={toggleFilter}>
        {isFilterExpanded ? (
          <FontAwesomeIcon icon={faTimes} className="text-xl cursor-pointer" />
        ) : (
          <FontAwesomeIcon icon={faFilter} className="text-xl cursor-pointer" />
        )}
      </div>
      {isFilterExpanded && (
        <div className="filter-content">
          <h4 className="text-lg font-bold mb-2">Filter by Geo</h4>
          <div className="checkboxes flex flex-col">
            <label className="checkbox-label mb-2">
              <input
                type="checkbox"
                value="IND"
                checked={selectedGeoIds.includes("IND")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              IND
            </label>
            <label className="checkbox-label mb-2">
              <input
                type="checkbox"
                value="USA"
                checked={selectedGeoIds.includes("USA")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              USA
            </label>
            <label className="checkbox-label mb-2">
              <input
                type="checkbox"
                value="UK"
                checked={selectedGeoIds.includes("UK")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              UK
            </label>
            <button
              onClick={handleApplyFilter}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionFilter;
