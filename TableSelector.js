import React from 'react';

const TableSelector = ({ selectedTable, onTableChange }) => {
  const tables = [1, 2, 3, 4, 5];

  return (
    <div className="mb-6">
      <label htmlFor="table" className="block text-sm font-medium text-gray-700 mb-2">
        Selecciona una mesa
      </label>
      <select
        id="table"
        value={selectedTable}
        onChange={(e) => onTableChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="">-- Selecciona mesa --</option>
        {tables.map((table) => (
          <option key={table} value={table}>
            Mesa {table}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelector;