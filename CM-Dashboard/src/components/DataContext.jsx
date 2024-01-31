
// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
};

export const DataContextProvider = ({ children }) => {
  const [selectedGeoIds, setSelectedGeoIds] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const handleCheckboxChange = (event) => {
    const geoName = event.target.value;
    setSelectedGeoIds((prevGeoIds) =>
      prevGeoIds.includes(geoName) ? prevGeoIds.filter((id) => id !== geoName) : [...prevGeoIds, geoName]
    );
  };

  const handleApplyFilter = async () => {
    try {
      // Perform the data fetching and filtering logic here
      // For now, I'll just set a placeholder array
      const filteredData = [{ id: 1, name: 'Filtered Data' }];
      setFilteredData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <DataContext.Provider value={{ selectedGeoIds, handleCheckboxChange, handleApplyFilter, filteredData }}>
      {children}
    </DataContext.Provider>
  );
};
