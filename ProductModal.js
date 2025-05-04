import React, { useState } from 'react';

const ProductModal = ({ product, onClose, onAddToOrder }) => {
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity) || 0;
    
    if (qty <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }
    
    onAddToOrder(product, qty, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setError('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3d819d] focus:border-transparent"
                placeholder="Ej: 2"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas especiales
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3d819d] focus:border-transparent"
                rows="3"
                placeholder="Ej: Sin hielo, con limón extra, etc."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d819d]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3d819d] hover:bg-[#2c5d73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d819d]"
              >
                Agregar al pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;