import React, { useState } from 'react';

const InvoiceForm = ({ invoiceData, setInvoiceData, onClose }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Datos de Facturación</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={invoiceData.name}
          onChange={(e) => setInvoiceData({...invoiceData, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Nombre completo"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo ID</label>
          <select
            name="idType"
            value={invoiceData.idType}
            onChange={(e) => setInvoiceData({...invoiceData, idType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="CC">CC</option>
            <option value="NIT">NIT</option>
            <option value="CE">Cédula Extranjera</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
          <input
            type="text"
            name="idNumber"
            value={invoiceData.idNumber}
            onChange={(e) => setInvoiceData({...invoiceData, idNumber: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Número de identificación"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
          <select
            name="contactType"
            value={invoiceData.contactType}
            onChange={(e) => setInvoiceData({...invoiceData, contactType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Teléfono">Teléfono</option>
            <option value="Correo">Correo</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Datos</label>
          <input
            type={invoiceData.contactType === 'Correo' ? 'email' : 'tel'}
            name="contact"
            value={invoiceData.contact}
            onChange={(e) => setInvoiceData({...invoiceData, contact: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder={invoiceData.contactType === 'Correo' ? 'correo@ejemplo.com' : '3001234567'}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;