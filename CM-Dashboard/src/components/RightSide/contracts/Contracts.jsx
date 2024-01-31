// Contracts.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import RegionFilter from "../../LeftSide/RegionFilter";

const Contracts = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null); // State for filtered data
  const url = "http://localhost:8083/api/contract-details";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRegionFilterApply = (filteredData) => {
    // Update the filtered data state when the filter is applied
    setFilteredData(filteredData);
  };

  return (
    <div className="flex justify-center items-end p-8">
      <div className="card w-96">
        <RegionFilter onFilterApply={handleRegionFilterApply} />

        <h2 className="text-xl font-bold mb-4">Contract Table</h2>

        <div className="mt-auto"> {/* Use "mt-auto" to push the table to the bottom of the card */}
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Contract ID</th>
                <th className="border px-4 py-2">Customer manager name</th>
                <th className="border px-4 py-2">Geo</th>
                <th className="border px-4 py-2">Contract Expiry Date</th>
                <th className="border px-4 py-2">ACV $k</th>
              </tr>
            </thead>
            <tbody>
              {filteredData ? (
                // Render filtered data if available
                filteredData.map((contract) => (
                  <tr key={contract[0]}>
                    <td className="border px-4 py-2">{contract[0]}</td>
                    <td className="border px-4 py-2">{contract[1]}</td>
                    <td className="border px-4 py-2">{contract[2]}</td>
                    <td className="border px-4 py-2">{contract[3]}</td>
                    <td className="border px-4 py-2">{contract[4]}</td>
                  </tr>
                ))
              ) : (
                // Render original data if no filter is applied
                data &&
                data.map((contract) => (
                  <tr key={contract[0]}>
                    <td className="border px-4 py-2">{contract[0]}</td>
                    <td className="border px-4 py-2">{contract[1]}</td>
                    <td className="border px-4 py-2">{contract[2]}</td>
                    <td className="border px-4 py-2">{contract[3]}</td>
                    <td className="border px-4 py-2">{contract[4]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
