import React from 'react';

const TableSelector = ({ selectedTable, onTableChange }) => {
  // Si en otros componentes usas IDs numéricos, mantén misma estructura
  const tables = [
    { id: 1, label: "Mesa 1 " }, 
    { id: 2, label: "Mesa 2 " },
    { id: 3, label: "Mesa 3 " },
    { id: 4, label: "Mesa 4 " },
    { id: 5, label: "Mesa 5 " },
    // ... (agregar todas las mesas necesarias)
  ];

  return (
    <div className="mb-6">
      <label htmlFor="table" className="block text-sm font-medium text-[#3d819d] mb-2">
        🪑 Seleccionar Mesa
      </label>
      <select
        id="table"
        value={selectedTable}
        onChange={(e) => onTableChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-[#3d819d] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2c5d73] text-gray-800 font-medium"
        required
      >
        <option value="" disabled className="text-gray-400">
          -- Elige una mesa --
        </option>
        {tables.map((table) => (
          <option 
            key={table.id} 
            value={table.id}
            className="hover:bg-[#3d819d] hover:text-white"
          >
            {table.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelector;
