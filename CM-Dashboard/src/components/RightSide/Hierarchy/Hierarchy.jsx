// Hierarchy.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import SubManagerTable from './SubManagerTable'; // Import the new component

const Hierarchy = () => {
  const [managers, setManagers] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [subManagers, setSubManagers] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false); // State to track whether the filter is applied

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/customer-managers');
        const parsedData = response.data;
        setManagers(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (managerId, event) => {
    const isArrowClick = event.target.classList.contains('arrow');

    if (isArrowClick) {
      setExpandedNodes((prevExpandedNodes) =>
        prevExpandedNodes.includes(managerId)
          ? prevExpandedNodes.filter((id) => id !== managerId)
          : [...prevExpandedNodes, managerId]
      );
    }
  };

  const handleCheckboxChange = (managerId) => {
    setSelectedManagerId(managerId);

    // Filter sub-managers for the selected manager
    const selectedManager = managers.find((manager) => manager.managerId === managerId);
    const subManagersForSelected = managers.filter((subManager) => subManager.parentManager === managerId);

    setSubManagers(subManagersForSelected);
  };

  const applyFilter = () => {
    // Add your filter logic here
    // For example, you can filter data based on some conditions

    // Set the state to indicate that the filter is applied
    setFilterApplied(true);
  };

  const renderTree = (managers, parentId = null) => {
    return managers
      .filter((manager) => manager.parentManager === parentId)
      .map((manager) => {
        const subManagerCount = managers.filter((subManager) => subManager.parentManager === manager.managerId).length;
        const hasSubManagers = subManagerCount > 0;
  
        return (
          <li key={manager.managerId}>
            <div className={`card bg-gray-100 p-4 mb-2 max-w-screen-sm mx-auto ${expandedNodes.includes(manager.managerId) ? 'border-l-4 border-blue-500' : ''}`}>
              <div className="card-header flex items-center" onClick={(event) => handleToggle(manager.managerId, event)}>
                {hasSubManagers && (
                  <span className={`arrow ${expandedNodes.includes(manager.managerId) ? 'down' : 'right'} mr-2`}>
                    {expandedNodes.includes(manager.managerId) ? '▼' : '►'}
                  </span>
                )}
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedManagerId === manager.managerId}
                  onChange={() => handleCheckboxChange(manager.managerId)}
                />
                <span className="manager-name font-bold">{manager.managerName}</span>
                {hasSubManagers && (
                  <span className="sub-manager-count text-sm ml-2">({subManagerCount})</span>
                )}
              </div>
              {hasSubManagers && expandedNodes.includes(manager.managerId) && (
                <ul className="ml-4">{renderTree(managers, manager.managerId)}</ul>
              )}
            </div>
          </li>
        );
      });
  };

  return (
    <div className="flex justify-start items-start h-screen p-4">
      {managers.length > 0 && (
        <div>
          <ul className="hierarchy">{renderTree(managers)}</ul>
          {filterApplied && selectedManagerId && (
            <SubManagerTable
              managerName={managers.find((manager) => manager.managerId === selectedManagerId)?.managerName}
              subManagers={subManagers}
            />
          )}
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={applyFilter}>
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Hierarchy;
