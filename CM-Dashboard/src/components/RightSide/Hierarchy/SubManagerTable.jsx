import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import * as XLSX from "xlsx"; 

const SubManagerTable = ({ managerName, subManagers, filterApplied, summaryData }) => {
  
  const handleDownloadExcel = () => {
    
    const worksheet = XLSX.utils.json_to_sheet([]);
   
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Manager Name", "Count", "ACV$"]],
      { style: { font: { bold: true } } }
    );

    
    XLSX.utils.sheet_add_json(worksheet, summaryData, { skipHeader: true, origin: "A2" });

    //  download
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary Data");
    XLSX.writeFile(workbook, "summary_data.xlsx");
  };

  return (
    <>
      <h2 className="ml-8 text-xl font-bold">LEAD: {managerName}</h2>

      <div className="flex pt-1 bg-white rounded-lg p-3 ml-auto">
        <div></div>

        {filterApplied && subManagers.length > 0 ? (
          <>
            <table className="w-full table-auto border border-gray-200">
              <thead>
                <tr className="text-left font-semibold uppercase tracking-wider text-gray-900 border-b">
                  <th className="py-2 px-2">Manager's Name</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {subManagers.map((subManager) => (
                     //add managerName also inside a submanager row
                  <tr key={subManager.managerId} className="border-b border-gray-400">
                    <td className="py-1- px-3">{subManager.managerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {summaryData && (
              <div className="ml-1 summary-table mt-2 border ">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-1 border-b border-gray-400">Count</th>
                      <th className="px-4 py-1 border-b border-gray-400">ACV$</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryData
                      .filter((item) =>
                        subManagers.some(
                          (subManager) => subManager.managerName === item.managerName
                        )
                      )
                      .sort((a, b) => b.managerName.localeCompare(a.managerName)) 
                      .map((item, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2 border border-gray-400">{item.managerNameCount}</td>
                          <td className="px-1 py-2 border-b border-gray-400">{item.acv}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            
            <FontAwesomeIcon
              icon={faFileExcel}
              className="text-xl cursor-pointer ml-2"
              onClick={handleDownloadExcel}
            />
          </>
        ) : (
          <p>No sub-managers to display.</p>
        )}
      </div>
    </>
  );
};

export default SubManagerTable;
