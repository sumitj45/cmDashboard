import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import XLSX library
import RegionFilter from "../../LeftSide/RegionFilter";

const Contracts = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const url = "http://localhost:8080/api/contract-details";

  const handleDownloadExcel = () => {
    const dataToExport = filteredData || data;
    // Initialize worksheet without headers
    const worksheet = XLSX.utils.json_to_sheet([]);
    // Add headers separately with bold formatting
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Contract ID", "Customer manager name", "Geo", "Contract Expiry Date", "ACV $k"]],
      { style: { font: "bold" } }
    );

    // Add data to worksheet, skipping headers
    XLSX.utils.sheet_add_json(worksheet, dataToExport, { skipHeader: true, origin: "A2" });

    // Create workbook and download
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contract Data");
    XLSX.writeFile(workbook, "contracts.xlsx");
  };

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
    setFilteredData(filteredData);
  };

  return (
    <div className="   flex justify-center items-center fixed bottom-0 left-0 w-full">
      <div className=" card w-140 p-8 overflow-y-auto max-h-screen relative">
        <RegionFilter onFilterApply={handleRegionFilterApply} />

        <h2 className="  text-xl font-bold ">Contract Table</h2>

        <div className="mt-auto relative mb-9 border border-blue-600">
          <div className="table-container">
            <table className="w-full border-t border-green-800">
              <thead>
                <tr>
                  <th className="border px-4 py-2 font-bold">Contract ID</th>
                  <th className="border px-4 py-2 font-bold">Customer manager name</th>
                  <th className="border px-4 py-2 font-bold">Geo</th>
                  <th className="border px-4 py-2 font-bold">Contract Expiry Date</th>
                  <th className="border px-4 py-2 font-bold">ACV $k</th>
                </tr>
              </thead>
              <tbody>
                {(filteredData || data)?.map((contract) => (
                  <tr key={contract[0]}>
                    <td className="border px-4 py-2">{contract[0]}</td>
                    <td className="border px-4 py-2">{contract[1]}</td>
                    <td className="border px-4 py-2">{contract[2]}</td>
                    <td className="border px-4 py-2">{contract[3]}</td>
                    <td className="border px-4 py-2">{contract[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FontAwesomeIcon
            icon={faFileExcel}
            className="text-xl cursor-pointer absolute top-4 right-[-2rem]"
            onClick={handleDownloadExcel}
          />
        </div>
      </div>
    </div>
  );
};

export default Contracts;
