import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SubManagerTable from "../RightSide/Hierarchy/SubManagerTable";

const Hierarchy = () => {
  const [managers, setManagers] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [subManagers, setSubManagers] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const hierarchyRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/customer-managers"
        );
        const parsedData = response.data;
        setManagers(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleToggle = async (managerId, event) => {
    const isArrowClick = event.target.classList.contains("arrow");

    if (isArrowClick) {
      setExpandedNodes((prevExpandedNodes) =>
        prevExpandedNodes.includes(managerId)
          ? prevExpandedNodes.filter((id) => id !== managerId)
          : [...prevExpandedNodes, managerId]
      );

      setSelectedManagerId(managerId);

      const subManagersForSelected = managers.filter(
        (subManager) => subManager.parentManager === managerId
      );

      setSubManagers(subManagersForSelected);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/summary?managerId=${managerId}`
        );
        setSummaryData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }
  };

  const handleCheckboxChange = (managerId, event) => {
    event.stopPropagation();
    setSelectedManagerId(managerId);

    const subManagersForSelected = managers.filter(
      (subManager) => subManager.parentManager === managerId
    );

    setSubManagers(subManagersForSelected);
  };

  const applyFilter = async () => {
    // Scroll to the top of the hierarchy container
    if (hierarchyRef.current) {
      hierarchyRef.current.scrollTop = 0;
    }
    setFilterApplied(true);

    // Fetch summary data based on the selected manager
    try {
      const response = await axios.get(
        `http://localhost:8080/api/summary?managerId=${selectedManagerId}`
      );
      setSummaryData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const renderTree = (managers, parentId = null) => {
    return (
      <ul className="max-h-[350px] overflow-y-auto" ref={hierarchyRef}>
        {managers
          .filter((manager) => manager.parentManager === parentId)
          .map((manager) => {
            const subManagers = managers.filter(
              (subManager) => subManager.parentManager === manager.managerId
            );
            const subManagerCount = subManagers.length;
            const totalSubManagerCount = subManagers.reduce(
              (count, subManager) =>
                count +
                renderTree(managers, subManager.managerId).props.children.length,
              subManagerCount
            );
            const hasSubManagers = totalSubManagerCount > 0;
  
            return (
              <li key={manager.managerId}>
                <div
                  className={`card shadow-sm bg-gray-50 p-4 mb-2 max-w-screen-sm mx-auto ${
                    expandedNodes.includes(manager.managerId)
                      ? "border-l-4 border-blue-500"
                      : ""
                  }`}
                  onClick={(event) => handleToggle(manager.managerId, event)}
                >
                  <div className="card-header flex items-center">
                    {hasSubManagers && (
                      <span
                        className={`arrow ${
                          expandedNodes.includes(manager.managerId)
                            ? "down"
                            : "right"
                        } mr-2`}
                      >
                        {expandedNodes.includes(manager.managerId) ? "▼" : "►"}
                      </span>
                    )}
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedManagerId === manager.managerId}
                      onChange={(event) =>
                        handleCheckboxChange(manager.managerId, event)
                      }
                      disabled={totalSubManagerCount === 0}
                    />
                    <span className="manager-name font-bold">
                      {manager.managerName}
                    </span>
                    {hasSubManagers && (
                      <span className="sub-manager-count text-sm ml-2">
                        ({totalSubManagerCount})
                      </span>
                    )}
                  </div>
                  {hasSubManagers &&
                    expandedNodes.includes(manager.managerId) &&
                    renderTree(managers, manager.managerId)}
                </div>
              </li>
            );
          })}
      </ul>
    );
  };
  

  return (
    <div className=" mb-2 pb-0 flex justify-start items-start p-4 ">
      {managers.length > 0 && (
        <>
          <div className="">
            {renderTree(managers)}

            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={applyFilter}
            >
              Apply
            </button>
          </div>

          <div className=" m-auto">
            {filterApplied && selectedManagerId && (
              <SubManagerTable
                managerName={
                  managers.find(
                    (manager) => manager.managerId === selectedManagerId
                  )?.managerName
                }
                subManagers={subManagers}
                filterApplied={filterApplied}
                summaryData={summaryData}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Hierarchy;
