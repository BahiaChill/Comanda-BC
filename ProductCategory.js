import React from 'react';

const ProductCategory = ({ category, products, onAddItem }) => {
  const handleAddClick = (product, e) => {
    e.stopPropagation();
    onAddItem(product);
    
    // Feedback visual
    const button = e.currentTarget;
    button.classList.add('bg-green-500');
    setTimeout(() => {
      button.classList.remove('bg-green-500');
      button.classList.add('bg-[#3d819d]');
    }, 300);
  };

  return (
    <div className="mb-8" aria-label={`Categoría ${category}`}>
      <h3 className="text-lg font-semibold text-[#3d819d] mb-4 border-b pb-2">
        {category}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <article 
            key={product.id}  // Key modificada aquí
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={(e) => handleAddClick(product, e)}
            tabIndex="0"
            aria-label={`Agregar ${product.name} por $${product.price}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{product.name}</h4>
                <p className="text-gray-600">
                  ${product.price.toLocaleString('es-CO')}
                </p>
                {product.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => handleAddClick(product, e)}
                className="bg-[#3d819d] hover:bg-[#2c5d73] text-white px-3 py-1 rounded-lg text-sm transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none"
                aria-label={`Agregar ${product.name}`}
              >
                + Agregar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
