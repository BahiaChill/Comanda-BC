import React from 'react';

const ProductCategory = ({ category, products, onAddItem }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#3d819d] mb-4 border-b pb-2">{category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.name} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{product.name}</h4>
                <p className="text-gray-600">${product.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => onAddItem(product)}
                className="bg-[#3d819d] hover:bg-[#2c5d73] text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;