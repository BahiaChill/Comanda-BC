import React, { useState } from 'react';  
import { products } from '../users';  // Ruta corregida  
import TableSelector from './TableSelector';  
import OrderSummary from './OrderSummary';  
import ProductModal from './ProductModal';  
import ProductSearch from './ProductSearch';  

const OrderScreen = ({ username, onLogout }) => {  
  const [selectedTable, setSelectedTable] = useState('');  
  const [items, setItems] = useState([]);  
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const [showTableChangeWarning, setShowTableChangeWarning] = useState(false);  
  const [pendingTable, setPendingTable] = useState('');  

  const handleAddItem = (product) => {  
    setSelectedProduct(product);  
  };  

  const handleAddToOrder = (product, quantity, notes) => {  
    setItems([...items, { product, quantity, notes }]);  
  };  

  const handleUpdateItem = (index, quantity, notes) => {  
    const newItems = [...items];  
    newItems[index] = {  
      ...newItems[index],  
      quantity,  
      notes  
    };  
    setItems(newItems);  
  };  

  const handleRemoveItem = (index) => {  
    const newItems = [...items];  
    newItems.splice(index, 1);  
    setItems(newItems);  
  };  

  const handleClearOrder = () => {  
    setItems([]);  
  };  

  const handleTableChange = (table) => {  
    if (items.length > 0 && selectedTable !== '') {  
      setPendingTable(table);  
      setShowTableChangeWarning(true);  
    } else {  
      setSelectedTable(table);  
    }  
  };  

  const confirmTableChange = () => {  
    setSelectedTable(pendingTable);  
    setItems([]);  
    setShowTableChangeWarning(false);  
  };  

  const cancelTableChange = () => {  
    setPendingTable('');  
    setShowTableChangeWarning(false);  
  };  

  return (  
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">  
      <div className="max-w-6xl mx-auto">  
        <div className="flex justify-between items-center mb-8">  
          <div>  
            <h1 className="text-2xl font-bold text-[#3d819d]">Bahia Chill</h1>  
            <p className="text-gray-600">Usuario: {username}</p>  
          </div>  
          <button  
            onClick={onLogout}  
            className="px-4 py-2 bg-[#3d819d] hover:bg-[#2c5d73] text-white rounded-lg transition-colors"  
          >  
            Cerrar sesión  
          </button>  
        </div>  

        <TableSelector   
          selectedTable={selectedTable}   
          onTableChange={handleTableChange}   
        />  

        {showTableChangeWarning && (  
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">  
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">  
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cambiar de mesa</h3>  
              <p className="text-gray-600 mb-6">Al cambiar de mesa se perderá el pedido actual. ¿Deseas continuar?</p>  
              <div className="flex justify-end space-x-3">  
                <button  
                  onClick={cancelTableChange}  
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"  
                >  
                  Cancelar  
                </button>  
                <button  
                  onClick={confirmTableChange}  
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3d819d] hover:bg-[#2c5d73]"  
                >  
                  Continuar  
                </button>  
              </div>  
            </div>  
          </div>  
        )}  

        {selectedTable ? (  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  
            <div className="lg:col-span-2">  
              <ProductSearch   
                products={products}   
                onProductSelect={handleAddItem}   
              />  
            </div>  
            <div>  
              <OrderSummary  
                items={items}  
                selectedTable={selectedTable}  
                username={username}  
                onUpdateItem={handleUpdateItem}  
                onRemoveItem={handleRemoveItem}  
                onClearOrder={handleClearOrder}  
              />  
            </div>  
          </div>  
        ) : (  
          <div className="bg-white p-8 rounded-lg shadow text-center">  
            <p className="text-gray-600">Por favor selecciona una mesa para comenzar a tomar pedidos</p>  
          </div>  
        )}  

        {selectedProduct && (  
          <ProductModal  
            product={selectedProduct}  
            onClose={() => setSelectedProduct(null)}  
            onAddToOrder={handleAddToOrder}  
          />  
        )}  
      </div>  
    </div>  
  );  
};  

export default OrderScreen;
