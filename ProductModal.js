import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, onClose, onAddToOrder }) => {
  const [quantity, setQuantity] = useState(1); // Valor inicial 1
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enfocar automáticamente el input al abrir el modal
  useEffect(() => {
    const input = document.getElementById('quantity-input');
    if (input) input.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const qty = parseInt(quantity);
    
    if (isNaN(qty) || qty <= 0) {
      setError('Ingrese una cantidad válida (mínimo 1)');
      setIsSubmitting(false);
      return;
    }
    
    if (qty > 50) {
      setError('La cantidad máxima es 50');
      setIsSubmitting(false);
      return;
    }
    
    onAddToOrder(product, qty, notes.trim());
    onClose();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    setError('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 id="modal-title" className="text-xl font-bold text-gray-800">
              {product.name} - ${product.price.toLocaleString()}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3d819d] rounded-full p-1"
              aria-label="Cerrar modal"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad *
              </label>
              <input
                id="quantity-input"
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3d819d] focus:border-transparent"
                required
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "quantity-error" : undefined}
              />
              {error && (
                <p id="quantity-error" className="text-red-500 text-sm mt-1" role="alert">
                  {error}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="notes-textarea" className="block text-sm font-medium text-gray-700 mb-1">
                Notas especiales
              </label>
              <textarea
                id="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3d819d] focus:border-transparent"
                rows="3"
                placeholder="Ej: Sin hielo, en botella, en vaso, etc."
                maxLength="200"
                aria-describedby="notes-help"
              />
              <p id="notes-help" className="text-xs text-gray-500 mt-1">
                Máximo 200 caracteres ({notes.length}/200)
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d819d] transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3d819d] hover:bg-[#2c5d73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d819d] transition-colors disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Agregando...' : 'Agregar al pedido'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
