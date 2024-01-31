import React from 'react';

const SubManagerTable = ({ managerName, subManagers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">LEAD: {managerName}</h2>
      <table className="w-full table-auto border border-gray-200">
        <thead>
          <tr className="text-left font-semibold uppercase tracking-wider text-gray-900 border-b border-gray-200">
            <th className="py-2 px-4">Manager's Name</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {subManagers.map((subManager) => (
            <tr key={subManager.managerId} className="border-b border-gray-200">
              <td className="py-2 px-4">{subManager.managerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubManagerTable;
