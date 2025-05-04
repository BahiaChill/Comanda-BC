import React, { useState } from 'react';

const ProductSearch = ({ products, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {isFocused && searchTerm && filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}  // <- Corregido: Usar ID en vez de nombre
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
              onMouseDown={() => {
                onProductSelect(product);
                setSearchTerm('');
              }}
            >
              <p className="font-medium">{product.name}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  ${product.price.toLocaleString('es-CO')} {/* Formato coherente */}
                </p>
                {product.category && (  // <- Mostrar categoría si existe
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
